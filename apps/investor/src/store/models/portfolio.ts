import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import { RootState } from 'store'

import axios from '../axios'
import handle403 from '../utils/handle403'
import { PortfolioState } from '../types/portfolio'

export const portfolio: ModelConfig<PortfolioState> = createModel<PortfolioState>({
  state: {
    offerings: undefined,
    investedAmount: undefined,
    isOfferingsLoading: true,
    isInvestedAmountLoading: true,
  },
  effects: () => ({
    async getOfferings(_: void, rootState: RootState): Promise<void> {
      try {
        this.setOfferingsLoading()

        const { data } = await axios.get('/v1/investment/offerings')

        this.setOfferings(data)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        }

        throw error
      }
    },
    async getInvestedAmount(_: void, rootState: RootState): Promise<void> {
      try {
        this.setInvestedAmountLoading()

        const { data } = await axios.get('/v1/investment/offerings/summary')

        this.setInvestedAmount(data)
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          return handle403(rootState.user.languageCode)
        }

        throw error
      }
    },
  }),
  reducers: {
    setOfferings: (state, payload): PortfolioState => ({
      ...state,
      offerings: payload,
      isOfferingsLoading: false,
    }),
    setOfferingsLoading: (state): PortfolioState => ({
      ...state,
      isOfferingsLoading: true,
    }),
    setInvestedAmount: (state, payload): PortfolioState => ({
      ...state,
      investedAmount: payload,
      isInvestedAmountLoading: false,
    }),
    setInvestedAmountLoading: (state): PortfolioState => ({
      ...state,
      isInvestedAmountLoading: true,
    }),
  }
})
