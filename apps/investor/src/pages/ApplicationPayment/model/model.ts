import {
  createDomain,
  forward,
} from 'effector'
import { AxiosResponse } from 'axios'

import { InvestApplication } from 'store/types/invest'

import axios from 'store/axios'

import { createDefaultRetryConfig } from 'utils/axios'

import { APIResponse } from 'store/types/api'
import {
  APIResponseDepositCardInvestmentApplication,
  APIResponseRetrieveInvestmentApplication,
  CardPaymentOperation,
  CardPaymentOperationStatus,
  SubmitCardTokenData,
} from './types'

import { PageGate } from './presenter'

const unpackAxiosResponse = <T>(response: AxiosResponse<APIResponse<T>>): T => response.data.data

export const domain = createDomain('InvestmentPayment')

export const fetchInvestmentFx = domain.createEffect<
  string,
  InvestApplication
  >({
  handler: (uuid) =>
    axios.get<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${uuid}`)
      .then(unpackAxiosResponse)
})

export const submitCardFormFx = domain.createEffect<
  SubmitCardTokenData,
  CardPaymentOperation
  >({
  handler: ({
              investmentId,
              cardToken,
            }) => axios
    .post<APIResponseDepositCardInvestmentApplication>(`/v1/investment/applications/${investmentId}/deposit/card`, {
      cardToken,
    })
    .then(unpackAxiosResponse)
})

export const awaitCardPaymentOperationStatusChangeFx = domain.createEffect<string, CardPaymentOperation>({
  handler: (uuid) =>
    axios
      .get<APIResponseDepositCardInvestmentApplication>(`/v1/payments/operations/${uuid}`, {
        'axios-retry': createDefaultRetryConfig((response): boolean => {
          const status = 'isAxiosError' in response
            ? response.response?.data.data.status
            : response.data.data.status

          return status === CardPaymentOperationStatus.waitingPayment || status === CardPaymentOperationStatus.processing
        })
      })
      .then(unpackAxiosResponse)
})

export const $Investment = domain.createStore<InvestApplication | null>(null)
  .on(fetchInvestmentFx.doneData, (state, payload) => payload)

export const $CardPaymentOperation = domain.createStore<CardPaymentOperation | null>(null)
  .on(awaitCardPaymentOperationStatusChangeFx.doneData, (state, payload) => payload)

forward({
  from: PageGate.open.map(({ investmentId }) => investmentId),
  to: fetchInvestmentFx,
})

export const setIsLoading = domain.createEvent<boolean>()

export const $IsLoading = domain.createStore<boolean>(true)
  .on(setIsLoading, (state, isLoading) => isLoading)

forward({
  from: fetchInvestmentFx.pending,
  to: setIsLoading,
})
