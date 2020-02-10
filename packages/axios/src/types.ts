import { AxiosRequestConfig } from 'axios'

export interface ExtendedAxiosConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: ((retryCount: number) => number) | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver: (data: any) => boolean;
  __retryCount: number;
}
