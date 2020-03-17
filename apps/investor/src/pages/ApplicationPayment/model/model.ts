import {
  createDomain,
  forward,
} from 'effector'

import { AxiosResponse } from 'axios'
import { APIResponse } from 'store/types/api'
import { InvestApplication } from 'store/types/invest'
import { JibrelBankAccount } from 'store/types/user'

import axios from 'store/axios'

import {
  InvestApplicationStore,
  APIResponseRetrieveInvestmentApplication,
} from './types'

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

export const $Investment = domain.createStore<InvestApplicationStore>(null)
  .on(fetchInvestmentFx.doneData, (state, payload) => payload)

export const setIsLoading = domain.createEvent<boolean>()

export const $IsLoading = domain.createStore<boolean>(true)
  .on(setIsLoading, (state, isLoading) => isLoading)

forward({
  from: fetchInvestmentFx.pending,
  to: setIsLoading,
})

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

export const $BankAccount = domain.createStore<JibrelBankAccount | null>(null)

forward({
  from: $Investment.map(transformToBankAccount),
  to: $BankAccount
})
