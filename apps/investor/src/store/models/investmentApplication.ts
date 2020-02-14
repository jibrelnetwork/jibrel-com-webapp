import { identity } from 'lodash-es'
import { createModel } from '@rematch/core'

import settings from 'app/settings'
import axios from 'store/axios'
import {SubscriptionAgreementStatus} from 'store/types/invest'

const agreementStatusMap: { [K in SubscriptionAgreementStatus]: boolean } = {
  [SubscriptionAgreementStatus.initial]: true,
  [SubscriptionAgreementStatus.preparing]: true,
  [SubscriptionAgreementStatus.validating]: true,
  [SubscriptionAgreementStatus.prepared]: false,
  [SubscriptionAgreementStatus.error]: false,
  [SubscriptionAgreementStatus.success]: false,
}

const INTERVAL_DELAY = 3000
const INTERVAL_MULTIPLY = 1.5

export const application = createModel({
  state: {
    data: {}
  },

  reducers: {
    requestSuccess: (state, { data: { data } }) => ({ ...state, data }),
    requestError: (state) => ({ ...state }),
  },

  effects: ({ investmentApplication }) => ({
    getById: ({ id, isRedirect = false }: { id: string; isRedirect: boolean }) => {
      return axios.get(`/v1/investment/applications/${id}`, {
        // @ts-ignore
        'axios-retry': {
          retries: settings.RETRY_DEFAULT_COUNT,
          retryDelay: (attempts: number) => attempts * INTERVAL_DELAY * INTERVAL_MULTIPLY,
          retryCondition: ({ response, status, ...responseProps }) => {
            // If non error response
            if (status === 200 || response === undefined) {
              const agreementStatus: SubscriptionAgreementStatus = responseProps.data.data.subscriptionAgreementStatus

              return agreementStatusMap[agreementStatus]
            }

            return true
          },
        },
      })
        .then(response => {
          if (response.status === 200 || response.response === undefined) {
            const docSignUrl = response.data.data.subscriptionAgreementRedirectUrl
            if (isRedirect && typeof docSignUrl === 'string' && docSignUrl.length > 0) {
              window.location.href = docSignUrl
            }
          }

          return investmentApplication.requestSuccess(response)
        })
        .catch(investmentApplication.requestError)
    },
    finishSigning: (id: string) =>
      axios.post(`/v1/investment/applications/${id}/finish-signing`)
    })
})
