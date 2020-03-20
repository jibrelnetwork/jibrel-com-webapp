import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { NotFound, } from '@jibrelcom/ui'

import CoreLayout from 'layouts/CoreLayout'

import settings from 'app/settings'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  DepositOperation,
  DepositOperationStatus,
  OperationStateStatus,
} from 'store/types/operations'

import { OperationProvisionalStatus } from 'app/router/types'

import {
  Loading,
  StatusError,
  StatusPending,
  StatusSuccess,
} from './components'

type StateProps = {
  loadingStatus: OperationStateStatus;
  operation: DepositOperation | null;
}

type DispatchProps = {
  init: (id: string) => void;
}

type OperationStatusProps = StateProps & DispatchProps & {
  id: string;
  status?: OperationProvisionalStatus;
}

const OperationStatus: React.FunctionComponent<OperationStatusProps> = ({
  id,
  status: provisionalStatus,
  loadingStatus,
  operation,
  init,
}) => {
  useEffect(() => {
    init(id)
  }, [])

  if (loadingStatus === OperationStateStatus.Error) {
    return (
      <CoreLayout>
        <NotFound
          host={settings.CMS_ORIGIN}
        />
      </CoreLayout>
    )
  } else if (loadingStatus === OperationStateStatus.Loading) {
    // Optimistic UI
    if (provisionalStatus === OperationProvisionalStatus.Failure) {
      return (
        <CoreLayout>
          <StatusError />
        </CoreLayout>
      )
    }

    if (provisionalStatus === OperationProvisionalStatus.Pending) {
      return (
        <CoreLayout>
          <StatusPending />
        </CoreLayout>
      )
    }

    return (
      <CoreLayout>
        <Loading />
      </CoreLayout>
    )
  } else {
    if (
      operation?.status === DepositOperationStatus.Canceled
      || operation?.status === DepositOperationStatus.Failed
      || operation?.status === DepositOperationStatus.Expired
      || operation?.status === DepositOperationStatus.WaitingForPayment
      || operation?.status === DepositOperationStatus.ActionRequired
    ) {
      return (
        <CoreLayout>
          <StatusError />
        </CoreLayout>
      )
    }

    if (operation?.status === DepositOperationStatus.Processing) {
      return (
        <CoreLayout>
          <StatusPending />
        </CoreLayout>
      )
    }

    // it is not possible, but we can't describe it with types because of how connect is written
    if (!operation) {
      return null
    }

    return (
      <CoreLayout>
        <StatusSuccess operation={operation} />
      </CoreLayout>
    )
  }
}

export default connect<StateProps, DispatchProps>(
  (state: RootState) => {
    const {
      status: loadingStatus,
      operation,
    } = state.operation

    return {
      loadingStatus,
      operation,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    init: dispatch.operation.fetch,
  })
)(OperationStatus)
