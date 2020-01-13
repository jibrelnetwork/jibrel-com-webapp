import React from 'react'

import CoreLayout from 'layouts/CoreLayout'

interface DepositProps {
  foo: string;
}

const Deposit: React.FunctionComponent<DepositProps> = () => {
  return (
    <CoreLayout>Deposit</CoreLayout>
  )
}

export default Deposit
