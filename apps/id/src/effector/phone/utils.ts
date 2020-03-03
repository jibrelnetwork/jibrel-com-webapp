import settings from 'app/settings'
import axios from 'store/axios'

import { SuccessWrapper, Phone, PhoneVerificationStatus } from './types'

const INTERVAL_MULTIPLY = 1.5
export const checkPhoneUntilResult = async (interval = 3000): Promise<SuccessWrapper<Phone>> => {
  return await axios
    .get<SuccessWrapper<Phone>>(
      '/v1/kyc/phone',
      {
        'axios-retry': {
          retries: settings.API_REQUEST_MAX_ATTEMPTS,
          retryDelay: attempts => attempts * interval * INTERVAL_MULTIPLY,
          retryCondition: response => {
            const { status } = response.response.data.data
            return status === PhoneVerificationStatus.code_sent
              || status === PhoneVerificationStatus.code_submitted
          }
        }
      }
    )
}
