import { createGate } from 'effector-react'

interface PageGateProps {
  investmentId: string;
}

export const PageGate = createGate<PageGateProps>('InvestmentPayment')
