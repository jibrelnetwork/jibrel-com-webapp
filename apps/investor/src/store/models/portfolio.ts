// we need axios without config for API
// for fetching companies data from CMS
import { default as axiosPlain } from 'axios'

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
    waitlist: undefined,
    companies: undefined,
    investments: undefined,
    investedAmount: undefined,
    isWaitlistLoading: true,
    isCompaniesLoading: true,
    isInvestmentsLoading: true,
    isInvestedAmountLoading: true,
  },
  effects: () => ({
    async getInvestments(_: void, rootState: RootState): Promise<void> {
      try {
        this.setInvestmentsLoading()

        const { data } = await axios.get('/v1/investment/applications')

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
    async getWaitlist(_: void, rootState: RootState): Promise<void> {
      try {
        this.setWaitlistLoading()

        const { data } = await axios.get('/v1/investment/offerings/subscriptions')

        this.setWaitlist(data.data)
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
    async getCompanies(_: void, rootState: RootState): Promise<void> {
      this.setCompaniesLoading()
      try {
        const { data } = await axiosPlain({
          method: 'get',
          withCredentials: true,
          url: `${settings.CMS_ORIGIN}/api/v1/companies`,
          headers: {
            'Accept-Language': rootState.user.languageCode,
          },
        })

        this.setCompanies(data.data)
      } catch (e) {
        console.error(e)
      } finally {
        this.setCompaniesLoading(false)
      }
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
    setWaitlist: (state, payload): PortfolioState => ({
      ...state,
      waitlist: payload,
      isWaitlistLoading: false,
    }),
    setWaitlistLoading: (state): PortfolioState => ({
      ...state,
      isWaitlistLoading: true,
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
    setCompanies: (state, payload): PortfolioState => ({
      ...state,
      companies: payload,
      isCompaniesLoading: false,
    }),
    setCompaniesLoading: (state, isCompaniesLoading = true): PortfolioState => ({
      ...state,
      isCompaniesLoading,
    }),
  }
})
