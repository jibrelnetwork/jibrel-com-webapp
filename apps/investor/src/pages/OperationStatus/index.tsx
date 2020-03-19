import React from 'react'

import CoreLayout from 'layouts/CoreLayout'

import StatusSuccess from './components/StatusSucess'

interface OperationStatusProps {
  id: string;
  foloosiTransactionId?: string;
}

const OperationStatus: React.FunctionComponent<OperationStatusProps> = ({
  id,
  foloosiTransactionId
}) => {
  return (
    <CoreLayout>
      <StatusSuccess />
    </CoreLayout>
  )
}

export default OperationStatus
