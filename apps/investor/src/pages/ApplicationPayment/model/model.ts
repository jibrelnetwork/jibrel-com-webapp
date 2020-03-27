import {
  combine,
  createDomain,
  forward,
  merge,
  sample,
  split,
  Store,
} from 'effector'

import { AxiosResponse } from 'axios'
import { APIResponse } from 'store/types/api'
import {
  InvestApplication,
  InvestmentStatus,
} from 'store/types/invest'
import { JibrelBankAccount } from 'store/types/user'

import axios from 'store/axios'
import { createDefaultRetryConfig } from 'utils/axios'

import {
  DepositOperation,
  DepositOperationStatus,
} from 'store/types/operations'

import { FoloosiGlobal } from './types/foloosi'

import {
  APIResponsePaymentsOperationDetails,
  APIResponseRetrieveInvestmentApplication,
  InitStatus,
  InvestApplicationStore,
} from './types'

const unpackAxiosResponse = <T>(response: AxiosResponse<APIResponse<T>>): T => response.data.data

export const domain = createDomain('InvestmentPayment')

export const init = domain.createEvent<string>()

export const fetchInvestmentFx = domain.createEffect<
  string,
  InvestApplication
  >({
  handler: (uuid) =>
    axios.get<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${uuid}`)
      .then(unpackAxiosResponse)
})

export const createFoloosiPaymentFx = domain.createEffect<string, InvestApplication>({
  handler: (uuid) =>
    axios.post<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${uuid}/deposit/card`)
      .then(unpackAxiosResponse)
})

forward({
  from: init,
  to: fetchInvestmentFx,
})

export const $Investment = domain.createStore<InvestApplicationStore>(null)
  .on(fetchInvestmentFx.doneData, (state, payload) => payload)
  .on(createFoloosiPaymentFx.doneData, (state, payload) => payload)

type PageInitStatusDependencies = {
  investmentPending: Store<boolean>;
  investment: Store<InvestApplicationStore>;
}

export const $PageInitStatus = combine<PageInitStatusDependencies, InitStatus>(
  {
    investmentPending: fetchInvestmentFx.pending,
    investment: $Investment,
  },
  ({
    investmentPending,
    investment,
  }) => {
    if (investmentPending) {
      return InitStatus.Loading
    }

    if(investment === null || investment.status !== InvestmentStatus.Pending) {
      return InitStatus.Error
    }

    return InitStatus.Success
  }
)

function transformToBankAccount(investmentData: InvestApplicationStore): JibrelBankAccount | null {
  if (investmentData === null) {
    return null
  }

  const { bankAccount, depositReferenceCode } = investmentData

  return {
    ...bankAccount,
    depositReferenceCode,
  }
}

export const $BankAccount = $Investment.map(transformToBankAccount)

export const addFoloosiScriptFx = domain.createEffect<void, FoloosiGlobal, ErrorEvent>({
  handler: () =>
    new Promise<FoloosiGlobal>((resolve, reject) => {
      if (!window.Foloosipay) {
        const script = document.createElement('script')
        script.onload = (): void => resolve({
          Foloosipay: window.Foloosipay,
          foloosiHandler: window.foloosiHandler,
          response: window.response,
        })
        script.onerror = (error): void => reject(error)
        script.setAttribute('src', 'https://www.foloosi.com/js/foloosipay.v2.js')
        document.head.appendChild(script)
      } else {
        resolve({
          Foloosipay: window.Foloosipay,
          foloosiHandler: window.foloosiHandler,
          response: window.response,
        })
      }
    })
})

const fetchDepositFx = domain.createEffect<string, DepositOperation>({
  handler: (depositId) =>
    axios.get<APIResponsePaymentsOperationDetails>(`/v1/payments/operations/${depositId}`, {
      'axios-retry': createDefaultRetryConfig<APIResponsePaymentsOperationDetails>((response) =>
        'isAxiosError' in response
          || response.data.data.status === DepositOperationStatus.WaitingForPayment
      ),
    })
      .then(unpackAxiosResponse)
})

export const foloosiInit = domain.createEvent<string>()

const foloosiInitializedAndInvestmentUpdated = sample(
  $Investment,
  merge([foloosiInit, $Investment])
)

const initFoloosiWithInvestment = split(
  foloosiInitializedAndInvestmentUpdated,
  {
    hasDepositId: (investment) => investment !== null && !!investment.depositId,
    hasNoDepositId: (investment) => investment !== null && !investment.depositId,
  }
)

forward({
  from: initFoloosiWithInvestment.hasDepositId.map((investment: InvestApplication) => investment.depositId as string),
  to: fetchDepositFx,
})

forward({
  from: initFoloosiWithInvestment.hasNoDepositId.map((investment: InvestApplication) => investment.uuid),
  to: createFoloosiPaymentFx,
})

forward({
  from: foloosiInit,
  to: addFoloosiScriptFx,
})

export const $FoloosiPayment = domain.createStore<DepositOperation | null>(null)
  .on(fetchDepositFx.doneData, (state, payload) => payload)

export const $FoloosiScript = domain.createStore<FoloosiGlobal | null>(null)
  .on(addFoloosiScriptFx.doneData, (state, payload) => payload)

type FoloosiInitStatusDependencies = {
  investmentPending: Store<boolean>;
  payment: Store<unknown>;
  createPaymentPending: Store<boolean>;
  fetchDepositPending: Store<boolean>;
  script: Store<FoloosiGlobal | null>;
  scriptPending: Store<boolean>;
}

export const $FoloosiInitStatus = combine<FoloosiInitStatusDependencies, InitStatus>(
  {
    investmentPending: fetchInvestmentFx.pending,
    payment: $FoloosiPayment,
    createPaymentPending: createFoloosiPaymentFx.pending,
    fetchDepositPending: fetchDepositFx.pending,
    script: $FoloosiScript,
    scriptPending: addFoloosiScriptFx.pending,
  },
  ({
    investmentPending,
    payment,
    createPaymentPending,
    fetchDepositPending,
    script,
    scriptPending,
  }) => {
    if (
      investmentPending
      || createPaymentPending
      || fetchDepositPending
      || scriptPending
    ) {
      return InitStatus.Loading
    }

    if (!payment || !script) {
      return InitStatus.Error
    }

    return InitStatus.Success
  }
)

export const $InvestmentAmount = $Investment.map<string>((state) =>
  state === null
    ? ''
    : state.amount
)
