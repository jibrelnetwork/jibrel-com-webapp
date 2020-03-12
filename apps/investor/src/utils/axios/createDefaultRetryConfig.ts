import {
  AxiosError,
  AxiosResponse,
} from 'axios'

import { IAxiosRetryConfig } from 'axios-retry'

import settings from 'app/settings'

const INTERVAL_MULTIPLY = 1.5

export const createDefaultRetryConfig = <T>(
  retryCondition: (error: AxiosError<T> | AxiosResponse<T>) => boolean
): IAxiosRetryConfig<T> => ({
  retries: settings.API_REQUEST_MAX_ATTEMPTS,
  retryDelay: (attempts): number => attempts * 3000 * INTERVAL_MULTIPLY,
  retryCondition,
})
