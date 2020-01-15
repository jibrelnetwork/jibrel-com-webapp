import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import {
  InvestState,
  DealTermsData,
} from '../types/invest'

export const invest: ModelConfig<InvestState> = createModel<InvestState>({
  state: {
    dealTermsData: undefined,
    isDealTermsLoading: false,
  },
  effects: () => ({
    async getDealTerms(id: string): Promise<DealTermsData | void> {
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
  }
})
