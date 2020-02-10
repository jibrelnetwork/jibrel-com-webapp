import axios from 'axios'

import { ExtendedAxiosConfig } from './types'

const AxiosRetry = axios.create()

AxiosRetry.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  const config: ExtendedAxiosConfig = err.config

  // If config does not exist or the retry option is not set, reject
  if(!config || !config.retry) {
    return Promise.reject(err)
  }

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0

  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err)
  }

  // Increase the retry count
  config.__retryCount += 1

  // Check type of retryDelay argument
  const retryDelay = typeof config.retryDelay === 'function'
    ? config.retryDelay(config.__retryCount)
    : config.retryDelay

  // Create new promise to handle exponential backoff
  const backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve()
    }, retryDelay || Infinity)
  })

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config)
  })
})

export default AxiosRetry
