import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Grid,
  Icon,
  Loader,
  BigButton,
  FormTitle,
} from '@jibrelcom/ui'

import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

import { formatCurrency } from 'utils/formatters'

import style from './style.scss'
import CheckoutCardInputField from '../CheckoutCardInputField'
import { CheckoutFormFields } from '../../model/types/checkout'

import {
  InitStatus,
  checkoutInit,
  createDeposit,
  $DepositPending,
  $InvestmentAmount,
  $CheckoutInitStatus,
} from '../../model'

interface CheckoutButtonProps {
  investmentId: string;
}

const CheckoutStatusContainer: React.FunctionComponent = ({ children }) => (
  <Grid.Container>
    <Grid.Item
      m={4}
      l={6}
      className={style.status}
    >
      {children}
    </Grid.Item>
  </Grid.Container>
)

const CheckoutStatus: React.FunctionComponent<CheckoutButtonProps> = ({ investmentId }) => {
  const i18n = useI18n()
  const languageCode = useLanguageCode()
  const status = useStore($CheckoutInitStatus)
  const depositPending = useStore($DepositPending)
  const investmentAmount = useStore($InvestmentAmount)

  const amount = formatCurrency(
    parseInt(investmentAmount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )

  if (status === InitStatus.Loading) {
    return (
      <CheckoutStatusContainer>
        <Loader className={style.loader} color={Loader.color.Gray} />
      </CheckoutStatusContainer>
    )
  }

  if (status === InitStatus.Error) {
    return (
      <div className={style.error}>
        <Icon
          className={style.unavailable}
          name='ic_unavailable_32'
        />
        <span>{i18n._('ApplicationPayment.Checkout.error.general')}</span>
      </div>
    )
  }

  return (
    <Form
      onSubmit={createDeposit}
      initialValues={{
        investmentId,
        cardToken: undefined,
      }}
      render={({ handleSubmit }: FormRenderProps<CheckoutFormFields>): React.ReactNode => (
        <form>
          <CheckoutStatusContainer>
            <CheckoutCardInputField name='cardToken' />
          </CheckoutStatusContainer>
          <Grid.Container>
            <Grid.Item
              s={4}
              m={4}
              l={4}
            >
              <BigButton
                onClick={handleSubmit}
                component='button'
                isLoading={depositPending}
                isDisabled={status !== InitStatus.Success}
              >
                {i18n._('ApplicationPayment.Checkout.action.pay', { amount })}
              </BigButton>
            </Grid.Item>
          </Grid.Container>
        </form>
      )}
    />
  )
}

const CheckoutButton: React.FunctionComponent<CheckoutButtonProps> = ({ investmentId }) => {
  useEffect(() => {
    checkoutInit()
  }, [])

  const i18n = useI18n()

  return (
    <>
      <FormTitle className={style.title} >
        {i18n._('ApplicationPayment.Checkout.title')}
        <Icon
          name='ic_lock_32'
          namespace='investor'
          className={style.lock}
        />
      </FormTitle>
      <p className={style.caption}>
        {i18n._('ApplicationPayment.Checkout.caption')}
      </p>
      <CheckoutStatus investmentId={investmentId} />
    </>
  )
}

export default CheckoutButton
