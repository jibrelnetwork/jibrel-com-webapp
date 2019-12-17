import React from 'react'

import Individual from './Individual'

interface KYCPages extends React.FunctionComponent {
  Individual: React.Component;
}

const KYC: KYCPages = () => {
  return (
    <div>KYC</div>
  )
}

KYC.Individual = Individual

export default KYC
