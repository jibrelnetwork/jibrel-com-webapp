import React from 'react'

import CoreLayout from 'layouts/CoreLayout'

import {
  StatusError,
  StatusPending,
  StatusSuccess,
  Loading
} from './components'

interface OperationStatusProps {
  id: string;
  foloosiTransactionId?: string;
}

// FIXME: JUST DEBUG THING, REMOVE BEFORE TASK DONE
const COMPONENT_RENDER_MAP = {
  success: StatusSuccess,
  pending: StatusPending,
  error: StatusError,
  loading: Loading
}

const DebugPanel = ({ changeStatusHandler }) => (
  <fieldset onClick={(e) => {
    const status = e.target?.value
    if (typeof status === 'string') {
      changeStatusHandler(status)
    }
  }}>
    <label htmlFor="status-success">
      <p>Success</p>
      <input type="radio" id="status-success" name="status" value='success' />
    </label>
    <label htmlFor="status-pending">
      <p>Pending</p>
      <input type="radio" id="status-pending" name="status" value='pending' />
    </label>
    <label htmlFor="status-error">
      <p>Error</p>
      <input type="radio" id="status-error" name="status" value='error'/>
    </label>
    <label htmlFor="status-loading">
      <p>Loading</p>
      <input type="radio" id="status-loading" name="status" value='loading'/>
    </label>
  </fieldset>
)

// !DEBUG

const OperationStatus: React.FunctionComponent<OperationStatusProps> = ({
  id,
  foloosiTransactionId
}) => {
  const [status, setStatus] = React.useState('pending')
  const Component = COMPONENT_RENDER_MAP[status]

  return (
    <CoreLayout>
      <Component />
      <DebugPanel changeStatusHandler={setStatus} />
    </CoreLayout>
  )
}

export default OperationStatus
