import {
  createDomain,
  forward,
} from 'effector'

import { InvestApplication } from 'store/types/invest'

import axios from 'store/axios'
import { unpackAxiosResponse } from 'utils/axios'

import {
  InvestApplicationStore,
  APIResponseRetrieveInvestmentApplication,
} from './types'

export const domain = createDomain('InvestmentPayment')

export const fetchInvestmentFx = domain.createEffect<
  string,
  InvestApplication
  >({
  handler: (uuid) =>
    axios.get<APIResponseRetrieveInvestmentApplication>(`/v1/investment/applications/${uuid}`)
      .then(unpackAxiosResponse)
})

export const $Investment = domain.createStore<InvestApplicationStore>(null)
  .on(fetchInvestmentFx.doneData, (state, payload) => payload)

export const setIsLoading = domain.createEvent<boolean>()

export const $IsLoading = domain.createStore<boolean>(true)
  .on(setIsLoading, (state, isLoading) => isLoading)

forward({
  from: fetchInvestmentFx.pending,
  to: setIsLoading,
})
