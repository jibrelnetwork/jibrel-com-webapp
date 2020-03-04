import axios from 'store/axios'

import { SuccessWrapper, Phone, PhoneVerificationStatus } from './types'

const INTERVAL_MULTIPLY = 1.5

export const checkPhoneUntilResult = async (interval = 3000): Promise<SuccessWrapper<Phone>> => {
  return await axios
    .get<{ data: Phone }>(
      '/v1/kyc/phone',
      {
        'axios-retry': {
          retries: Infinity,
          retryDelay: (attempts): number => attempts * interval * INTERVAL_MULTIPLY,
          retryCondition: (response): boolean => {
            const status = 'isAxiosError' in response
              ? response.response?.data.data.status
              : response.data.data.status

            return status === PhoneVerificationStatus.codeSent
              || status === PhoneVerificationStatus.codeSubmitted
          }
        }
      }
    )
}
