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
import { InvestApplication } from 'store/types/invest'

import { OperationProvisionalStatus } from 'app/router/types'

import {
  Loading,
  StatusError,
  StatusPending,
  StatusSuccess,
} from './components'

enum DerivedOperationStatus {
  NotFound = 'not_found',
  Error = 'error',
  Loading = 'loading',
  Pending = 'pending',
  Success = 'success',
}

const deriveOperationStatus = (
  loadingStatus: OperationStateStatus,
  provisionalStatus: OperationProvisionalStatus | undefined,
  operationStatus: DepositOperationStatus | undefined,
): DerivedOperationStatus => {
  if (loadingStatus === OperationStateStatus.Error) {
    return DerivedOperationStatus.NotFound
  }

  if (loadingStatus === OperationStateStatus.Loading) {
    switch (provisionalStatus) {
      case OperationProvisionalStatus.Failure:
        return DerivedOperationStatus.Error
      case OperationProvisionalStatus.Pending:
        return DerivedOperationStatus.Pending
      default:
        return DerivedOperationStatus.Loading
    }
  }

  switch (operationStatus) {
    case DepositOperationStatus.Canceled:
    case DepositOperationStatus.Failed:
    case DepositOperationStatus.Expired:
      return DerivedOperationStatus.Error
    case DepositOperationStatus.WaitingForPayment:
    case DepositOperationStatus.ActionRequired:
    case DepositOperationStatus.Processing:
      return DerivedOperationStatus.Pending
    case DepositOperationStatus.Completed:
      return DerivedOperationStatus.Success
    default:
      return DerivedOperationStatus.Loading
  }
}

type StateProps = {
  loadingStatus: OperationStateStatus;
  operation: DepositOperation | undefined;
  investment: InvestApplication | undefined;
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
  investment,
  init,
}) => {
  useEffect(() => {
    init(id)
  }, [])

  const operationStatus = deriveOperationStatus(loadingStatus, provisionalStatus, operation?.status)

  switch (operationStatus) {
    case DerivedOperationStatus.NotFound:
      return (
        <CoreLayout>
          <NotFound
            host={settings.CMS_ORIGIN}
          />
        </CoreLayout>
      )
    case DerivedOperationStatus.Error:
      return (
        <CoreLayout>
          <StatusError
            investment={investment}
          />
        </CoreLayout>
      )
    case DerivedOperationStatus.Loading:
      return (
        <CoreLayout>
          <Loading />
        </CoreLayout>
      )
    case DerivedOperationStatus.Pending:
      return (
        <CoreLayout>
          <StatusPending />
        </CoreLayout>
      )
    case DerivedOperationStatus.Success:
      // operation existence is checked in deriving success status
      return (
        <CoreLayout>
          <StatusSuccess
            operation={operation as DepositOperation}
            investment={investment}
          />
        </CoreLayout>
      )
  }
}

export default connect<StateProps, DispatchProps>(
  (state: RootState) => {
    const {
      status: loadingStatus,
      operation,
      investment,
    } = state.operation

    return {
      loadingStatus,
      operation,
      investment,
    }
  },
  (dispatch: Dispatch): DispatchProps => ({
    init: dispatch.operation.fetch,
  })
)(OperationStatus)
