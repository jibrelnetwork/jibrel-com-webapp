import { AxiosResponse } from 'axios'
import { APIResponse } from 'store/types/api'

export const unpackAxiosResponse = <T>(response: AxiosResponse<APIResponse<T>>): T => response.data.data
