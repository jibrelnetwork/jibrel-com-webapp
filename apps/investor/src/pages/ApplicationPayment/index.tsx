import React from 'react'
import { createGate } from 'effector-react'
import { forward } from 'effector'

import { useI18n } from '@jibrelcom/i18n'

import CoreLayout from 'layouts/CoreLayout'

import { fetchInvestmentFx } from './model'
import Investment from './components/Investment'
import PaymentTabs from './components/PaymentTabs'
import WireTransfer from './components/WireTransfer'

interface ApplicationPaymentProps {
  id: string;
}

interface PageGateProps {
  investmentId: string;
}

const PageGate = createGate<PageGateProps>('InvestmentPayment')

forward({
  from: PageGate.open.map(({ investmentId }) => investmentId),
  to: fetchInvestmentFx,
})

const ApplicationPayment: React.FunctionComponent<ApplicationPaymentProps> = ({
  id,
}) => {
  const i18n = useI18n()
  const initialPaymentMethodId = window.location.hash
    ? window.location.hash.slice(1)
    : undefined

  return (
    <CoreLayout>
      <PageGate investmentId={id} />
      <Investment />
      <PaymentTabs.List
        initialSelectedId={initialPaymentMethodId}
      >
        <PaymentTabs.Item
          id='transfer'
          title={i18n._('ApplicationPayment.Methods.transfer.title')}
          icon='ic_globe_24'
        >
          <WireTransfer investmentApplicationId={id} />
        </PaymentTabs.Item>
        <PaymentTabs.Item
          id='card'
          title={i18n._('ApplicationPayment.Methods.card.title')}
          icon='ic_card_24'
        >
          TODO: card
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
