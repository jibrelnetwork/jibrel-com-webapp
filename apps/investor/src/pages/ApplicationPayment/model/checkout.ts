import { AxiosResponse } from 'axios'

import {
  split,
  combine,
  forward,
  createDomain,
  Store,
} from 'effector'

import axios from 'store/axios'
import { router } from 'app/router'
import { APIResponse } from 'store/types/api'
import { InvestApplication } from 'store/types/invest'
import { createDefaultRetryConfig } from 'utils/axios'

import {
  DepositOperation,
  DepositOperationStatus,
} from 'store/types/operations'

import {
  CheckoutFrames,
  CheckoutFormFields,
} from './types/checkout'

import {
  InitStatus,
  APIResponsePaymentsOperationDetails,
  APIResponseRetrieveInvestmentApplication,
} from './types'

export const domain = createDomain('CheckoutPayment')
export const checkoutInit = domain.createEvent<void>()
const getResponseData = <T>(response: AxiosResponse<APIResponse<T>>): T => response.data.data

export const createDeposit = domain.createEffect<CheckoutFormFields, InvestApplication>({
  handler: ({
    cardToken,
    investmentId,
  }) => axios.post<APIResponseRetrieveInvestmentApplication>(
    `/v1/investment/applications/${investmentId}/deposit/card`,
    { cardToken },
  ).then(getResponseData)
})

const createDepositDone = split(
  createDeposit.doneData, {
    hasDepositId: investment => !!investment?.depositId,
  },
)

const fetchDeposit = domain.createEffect<string, DepositOperation>({
  handler: depositId => axios
    .get<APIResponsePaymentsOperationDetails>(`/v1/payments/operations/${depositId}`, {
      'axios-retry': createDefaultRetryConfig<APIResponsePaymentsOperationDetails>((response) => {
        if ('isAxiosError' in response) {
          return true
        }

        return (response.data.data.status === DepositOperationStatus.WaitingForPayment)
      }),
    })
    .then(getResponseData)
})

const addCheckoutFrames = domain.createEffect<void, CheckoutFrames, ErrorEvent>({
  handler: () =>
    new Promise<CheckoutFrames>((resolve, reject) => {
      if (!window.Frames) {
        const script = document.createElement('script')
        script.onload = (): void => resolve(window.Frames)
        script.onerror = (error): void => reject(error)
        script.setAttribute('src', 'https://cdn.checkout.com/js/framesv2.min.js')
        document.head.appendChild(script)
      } else {
        resolve(window.Frames)
      }
    })
})

const redirectAfterDeposit = domain.createEffect<DepositOperation, void>({
  handler: ({
    uuid,
    charge,
    status,
  }) => {
    if ((status === DepositOperationStatus.ActionRequired) && charge) {
      window.location.href = charge.actionUrl

      return
    }

    router.navigate('OperationStatus', { id: uuid })

    return
  }
})

forward({
  from: checkoutInit,
  to: addCheckoutFrames,
})

forward({
  from: createDepositDone.hasDepositId.map(investment => investment.depositId as string),
  to: fetchDeposit,
})

forward({
  from: fetchDeposit.doneData,
  to: redirectAfterDeposit,
})

export const $CheckoutFrames = domain.createStore<CheckoutFrames | null>(null)
  .on(addCheckoutFrames.doneData, (_, payload) => payload)

export const $DepositPending = domain.createStore<boolean>(false)
  .on(createDeposit.pending, (_, payload) => payload)

type CheckoutInitStatusDependencies = {
  frames: Store<CheckoutFrames | null>;
  framesPending: Store<boolean>;
}

export const $CheckoutInitStatus = combine<CheckoutInitStatusDependencies, InitStatus>({
  frames: $CheckoutFrames,
  framesPending: addCheckoutFrames.pending,
}, ({
  frames,
  framesPending,
}) => {
  if (framesPending) {
    return InitStatus.Loading
  } else if (!frames) {
    return InitStatus.Error
  }

  return InitStatus.Success
})
