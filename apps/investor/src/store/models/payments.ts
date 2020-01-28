import { actions } from 'redux-router5'
import { LanguageCode } from '@jibrelcom/i18n'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import settings from 'app/settings'

import {
  Dispatch,
  RootState,
} from 'store'

import axios from '../axios'

import {
  PaymentsState,
  DepositFormFields,
} from '../types/payments'

const ID_DOMAIN = `id.${settings.FRONTEND_ROOT_DOMAIN_NAME}`

function handle403(lang: LanguageCode): void {
  window.location.href = `//${ID_DOMAIN}/${lang}/login`
}

export const payments: ModelConfig<PaymentsState> = createModel<PaymentsState>({
  state: {
    bankAccountData: undefined,
    paymentInformation: undefined,
    balance: undefined,
    depositAmount: undefined,
    isBalanceLoading: true,
  },
  effects: (dispatch: Dispatch) => ({
    async getBalance(_: void, rootState: RootState): Promise<void> {
      try {
        this.setBalanceLoading()

        const { data } = await axios.get('/v1/payments/balance')

        this.setBalance(data.balance)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 409) {
          dispatch(actions.navigateTo('Unverified'))

          return
        }

        throw error
      }
    },
    async getPaymentInformation(_: void, rootState: RootState): Promise<void> {
      try {
        const { data } = await axios.get('/v1/payments/bank-account')

        this.setPaymentInformation(data[0])
      } catch (error) {
        if (!error.response) {
          throw error
        }

        if (error.response.status === 403) {
          return handle403(rootState.user.languageCode)
        }

        throw error
      }
    },
    async addBankAccount(values: DepositFormFields, rootState: RootState): Promise<void> {
      try {
        await axios.post('/v1/payments/bank-account', values)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 400) {
          return error.formValidation
        }

        throw error
      }
    },
    async deposit(values: DepositFormFields, rootState: RootState): Promise<void> {
      try {
        await axios.get('/v1/payments/balance')

        this.setBalance(data.balance)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        } else if (status === 409) {
          dispatch(actions.navigateTo('Unverified'))

          return
        }

        throw error
      }
    },
  }),
  reducers: {
    setBalance: (state, payload): PaymentsState => ({
      ...state,
      balance: payload,
      isBalanceLoading: false,
    }),
    setBalanceLoading: (state): PaymentsState => ({
      ...state,
      isBalanceLoading: true,
    }),
  }
})
