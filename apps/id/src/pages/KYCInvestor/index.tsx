import React from 'react'

import Personal from './Personal'

interface KYCInvestorPages extends React.FunctionComponent {
  Personal: React.FunctionComponent;
}

const KYCInvestor: KYCInvestorPages = () => {
  return (
    <div>KYCInvestor</div>
  )
}

KYCInvestor.Personal = Personal

export default KYCInvestor
