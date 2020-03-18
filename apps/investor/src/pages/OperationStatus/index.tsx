import React from 'react'

import CoreLayout from 'layouts/CoreLayout'

interface OperationStatusProps {
  id: string;
  foloosiTransactionId?: string;
}

const OperationStatus: React.FunctionComponent<OperationStatusProps> = () => {
  return <CoreLayout>Operation</CoreLayout>
}

export default OperationStatus
