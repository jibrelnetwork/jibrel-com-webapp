import React from 'react'
import {
  createGate,
  useGate,
  useStore,
} from 'effector-react'
import { forward } from 'effector'

import {
  BigButton,
  Grid,
  Icon,
  Loader,
} from '@jibrelcom/ui'

import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

import { formatCurrency } from 'utils/formatters'
import settings from 'app/settings'
import { router } from 'app/router'

import {
  $FoloosiInitStatus,
  $FoloosiPayment,
  $FoloosiScript,
  $InvestmentAmount,
  foloosiInit,
  InitStatus,
} from '../../model'

import { FoloosiEventStatus } from '../../model/foloosi'

import style from './style.scss'

interface GateProps {
  investmentId: string;
}

const Gate = createGate<GateProps>()

forward({
  from: Gate.open.map(({ investmentId }) => investmentId),
  to: foloosiInit,
})

interface FoloosiButtonProps {
  investmentId: string;
}

const FoloosiStatus: React.FC = () => {
  const status = useStore($FoloosiInitStatus)
  const i18n = useI18n()

  if (status === InitStatus.Loading) {
    return (
      <Loader className={style.loader} color={Loader.color.Gray} />
    )
  }

  if (status === InitStatus.Error) {
    return (
      <div className={style.error}>
        <Icon
          name='ic_unavailable_32'
          className={style.errorIcon}
        />
        <span>{i18n._('ApplicationPayment.Foloosi.error.general')}</span>
      </div>
    )
  }

  return (
    <div className={style.success}>
      <div className={style.cardIcons}>
        <Icon
          name='ic_payment_amex'
          className={style.cardIcon}
        />
        <Icon
          name='ic_payment_mastercard'
          className={style.cardIcon}
        />
        <Icon
          name='ic_payment_visa'
          className={style.cardIcon}
        />
      </div>
      <div>{i18n._('ApplicationPayment.Foloosi.instructions')}</div>
    </div>
  )
}

const FoloosiButton: React.FC<FoloosiButtonProps> = ({
  investmentId,
}) => {
  useGate<GateProps>(Gate, { investmentId })
  const i18n = useI18n()
  const languageCode = useLanguageCode()
  const status = useStore($FoloosiInitStatus)
  const investmentAmount = useStore($InvestmentAmount)
  const payment = useStore($FoloosiPayment)
  const script = useStore($FoloosiScript)

  const clickHandler = (): void => {
    if (script === null || payment === null || !payment.charge) {
      return
    }

    const {
      Foloosipay,
      response,
      foloosiHandler,
    } = script

    // FIXME: duplicates instance on click-close-click
    // FIXME: should derive instance in model instead
    /* eslint-disable @typescript-eslint/camelcase */
    const fp = new Foloosipay({
      reference_token: payment.charge.referenceToken,
      merchant_key: settings.FOLOOSI_MERCHANT_KEY,
    })
    /* eslint-enable @typescript-eslint/camelcase */

    foloosiHandler(response, (event) => {
      fp.close()
      if (event.data.status === FoloosiEventStatus.Success) {
        router.navigate('OperationStatus', {
          id: payment.uuid,
          foloosiTransactionId: event.data.data.transaction_no,
        })
      } else if (event.data.status === FoloosiEventStatus.Error) {
        router.navigate('OperationStatus', {
          id: payment.uuid,
          status: 'failed',
        })
      }
    })

    fp.open()
  }

  const amount = formatCurrency(
    parseInt(investmentAmount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )

  return (
    <>
      <h4 className={style.title}>
        {i18n._('ApplicationPayment.Foloosi.title')}
      </h4>
      <Grid.Container>
        <Grid.Item
          m={4}
          l={6}
          className={style.status}
        >
          <FoloosiStatus />
        </Grid.Item>
      </Grid.Container>
      <Grid.Container>
        <Grid.Item
          s={4}
          m={4}
          l={4}
        >
          <BigButton
            component='button'
            isDisabled={status !== InitStatus.Success}
            onClick={clickHandler}
          >
            {i18n._('ApplicationPayment.Foloosi.action.pay', { amount })}
          </BigButton>
        </Grid.Item>
      </Grid.Container>
    </>
  )
}

export default FoloosiButton
