import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import { InvestState } from '../types/invest'

export const invest: ModelConfig<InvestState> = createModel<InvestState>({
  state: {
    customerData: undefined,
    dealTermsData: undefined,
    isDealTermsLoading: true,
    isCustomerDataLoading: true,
  },
  effects: () => ({
    async getDealTerms(id: string): Promise<void> {
      if (!id) {
        return Promise.resolve(undefined)
      }

      this.setDealTermsLoading()

      await new Promise(resolve => setTimeout(resolve, 3000))

      this.setDealTerms({
        id: 'startupId',
        name: 'Startup Name',
        pricePerShare: '$30',
        fundingRound: 'Seed Round',
        minimumInvestment: '$1,000',
        typeOfSecurity: 'Common Shares',
        roundSize: 400000,
        offeredEquity: 20,
        valuation: 2000000,
        deadline: Date.now() + 2 ** 33,
      })
    },
    async getCustomerData(id: string): Promise<void> {
      if (!id) {
        return Promise.resolve(undefined)
      }

      this.setCustomerDataLoading()

      await new Promise(resolve => setTimeout(resolve, 3000))

      this.setCustomerData({
        name: 'Talal Tabbaa',
        streetAddress: 'Abu Dhabi Global Market Authorities Building',
        apartment: 'ADGM Square',
        city: 'Al Maryah Island',
        postCode: 'PO Box 111999',
        country: 'Abu Dhabi, UAE',
      })
    },
  }),
  reducers: {
    setDealTerms: (state, payload): InvestState => ({
      ...state,
      dealTermsData: payload,
      isDealTermsLoading: false,
    }),
    setDealTermsLoading: (state): InvestState => ({
      ...state,
      isDealTermsLoading: true,
    }),
    setCustomerData: (state, payload): InvestState => ({
      ...state,
      customerData: payload,
      isCustomerDataLoading: false,
    }),
    setCustomerDataLoading: (state): InvestState => ({
      ...state,
      isCustomerDataLoading: true,
    }),
  }
})
