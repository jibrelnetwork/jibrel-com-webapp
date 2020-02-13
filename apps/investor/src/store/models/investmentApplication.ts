import { createModel } from '@rematch/core'

import settings from 'app/settings'
import axios from 'store/axios'
import {SubscriptionAgreementStatus} from 'store/types/invest'

export const application = createModel({
  state: {
    data: {}
  },

  reducers: {
    requestSuccess: (state, { data: { data } }) => ({ ...state, data }),
    requestError: (state) => ({ ...state }),
  },

  effects: ({ investmentApplication }) => ({
    getById: ({ id, isRedirect }: { id: string; isRedirect: boolean }) => {
      return axios.get(`/v1/investment/applications/${id}`, {
        // @ts-ignore
        'axios-retry': {
          retries: settings.RETRY_DEFAULT_COUNT,
          retryDelay: (attempts: number) => attempts * 1000,
          retryCondition: ({ response, status, ...responseProps }) => {
            // If non error response
            if (status === 200 || response === undefined) {
              const agreementStatus = responseProps.data.data.subscriptionAgreementStatus

              return agreementStatus !== SubscriptionAgreementStatus.prepared
            }

            return true
          },
        },
      })
        .then(response => {
          const docSignUrl = response.data.data.subscriptionAgreementRedirectUrl
          const isPrepared = response.data.data.subscriptionAgreementStatus === SubscriptionAgreementStatus.prepared
          if (isRedirect && typeof docSignUrl === 'string' && docSignUrl.length > 0) {
            window.location.href = docSignUrl
          }

          return investmentApplication.requestSuccess(response)
        })
        .catch(investmentApplication.requestError)
    },
    finishSigning: (id) =>
      axios.post(`/v1/investment/applications/${id}/finish-signing`)
        .then(response => { console.log(response) })
        .catch(x => { console.log(x) })
    })
})
