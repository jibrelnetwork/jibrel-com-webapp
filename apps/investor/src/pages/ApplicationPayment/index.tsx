import React from 'react'
import {
  createGate,
  useGate,
  useStore,
} from 'effector-react'
import { forward } from 'effector'

import { useI18n } from '@jibrelcom/i18n'
import {
  NotFound,
  Loader,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'

import {
  $PageInitStatus,
  init,
  InitStatus,
} from './model'
import Investment from './components/Investment'
import PaymentTabs from './components/PaymentTabs'
import WireTransfer from './components/WireTransfer'
import CheckoutButton from './components/CheckoutButton'
import style from './style.scss'

interface ApplicationPaymentProps {
  id: string;
}

interface PageGateProps {
  investmentId: string;
}

const PageGate = createGate<PageGateProps>('InvestmentPayment')

forward({
  from: PageGate.open.map(({ investmentId }) => investmentId),
  to: init,
})

const ApplicationPayment: React.FunctionComponent<ApplicationPaymentProps> = ({
  id,
}) => {
  useGate<PageGateProps>(PageGate, { investmentId: id })
  const status = useStore($PageInitStatus)
  const i18n = useI18n()
  const initialPaymentMethodId = window.location.hash
    ? window.location.hash.slice(1)
    : undefined

  if (status === InitStatus.Loading) {
    return (
      <CoreLayout>
        <Loader color={Loader.color.Blue} className={style.loader} />
      </CoreLayout>
    )
  }

  if (status === InitStatus.Error) {
    return (
      <CoreLayout>
        <NotFound
          host={settings.CMS_ORIGIN}
        />
      </CoreLayout>
    )
  }

  return (
    <CoreLayout>
      <Investment />
      <PaymentTabs.List
        initialSelectedId={initialPaymentMethodId}
      >
        <PaymentTabs.Item
          id='transfer'
          title={i18n._('ApplicationPayment.Methods.transfer.title')}
          icon='ic_globe_24'
        >
          <WireTransfer />
        </PaymentTabs.Item>
        <PaymentTabs.Item
          id='card'
          title={i18n._('ApplicationPayment.Methods.card.title')}
          icon='ic_card_24'
        >
          <CheckoutButton investmentId={id} />
        </PaymentTabs.Item>
        <PaymentTabs.Item
          id='account'
          title={i18n._('ApplicationPayment.Methods.account.title')}
          icon='ic_human_24'
          isDisabled
        />
        <PaymentTabs.Item
          id='crypto'
          title={i18n._('ApplicationPayment.Methods.crypto.title')}
          icon='ic_crypto_24'
          isDisabled
        />
      </PaymentTabs.List>
    </CoreLayout>
  )
}

export default ApplicationPayment
