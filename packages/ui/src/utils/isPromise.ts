// this function checks any input
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPromise = (obj: any): obj is Promise<any> =>
  !!obj
  && (typeof obj === 'object' || typeof obj === 'function')
  && typeof obj.then === 'function'

export default isPromise
