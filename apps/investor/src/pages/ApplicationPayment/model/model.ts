import {
  createDomain,
  forward,
} from 'effector'
import { AxiosResponse } from 'axios'

import { InvestApplication } from 'store/types/invest'

import axios from 'store/axios'

import { APIResponse } from 'store/types/api'
import {
  APIResponseRetrieveInvestmentApplication,
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

export const $Investment = domain.createStore<InvestApplication | null>(null)
  .on(fetchInvestmentFx.doneData, (state, payload) => payload)

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
