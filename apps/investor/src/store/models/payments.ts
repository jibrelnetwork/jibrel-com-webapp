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

import { PaymentsState } from '../types/payments'

function handle403(lang: LanguageCode): void {
  window.location.href = `${settings.ID_ORIGIN}/${lang}/login`
}

export const payments: ModelConfig<PaymentsState> = createModel<PaymentsState>({
  state: {
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
