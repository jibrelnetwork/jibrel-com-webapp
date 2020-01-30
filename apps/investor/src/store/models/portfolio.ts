import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import settings from 'app/settings'
import { RootState } from 'store'

import axios from '../axios'
import handle403 from '../utils/handle403'
import { PortfolioState } from '../types/portfolio'

export const portfolio: ModelConfig<PortfolioState> = createModel<PortfolioState>({
  state: {
    companies: {},
    investments: undefined,
    investedAmount: undefined,
    isInvestmentsLoading: true,
    isInvestedAmountLoading: true,
  },
  effects: () => ({
    async getInvestments(_: void, rootState: RootState): Promise<void> {
      try {
        this.setInvestmentsLoading()

        const { data } = await axios.get('/v1/investment/offerings')

        this.setInvestments(data.data)
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

        this.setInvestedAmount(data.total_investment)
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
    async getCompanyData(id: string): Promise<void> {
      const cmsAPI = __DEV__ ? 'https://jibrelcom.develop.jdev.network' : settings.HOST_CMS
      const { data } = await axios.get(`${cmsAPI}/api/v1/companies/${id}`)

      this.setCompanyData(data)
    },
  }),
  reducers: {
    setInvestments: (state, payload): PortfolioState => ({
      ...state,
      investments: payload,
      isInvestmentsLoading: false,
    }),
    setInvestmentsLoading: (state): PortfolioState => ({
      ...state,
      isInvestmentsLoading: true,
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
    setCompanyData: (state, payload): PortfolioState => ({
      ...state,
      companies: {
        ...state.companies,
        [payload.id]: payload,
      },
    }),
  }
})
