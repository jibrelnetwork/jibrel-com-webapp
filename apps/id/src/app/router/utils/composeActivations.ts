import { ActivationFn, ActivationFnFactory, Router, State } from 'router5'
import { RouterDependencies } from 'app/router/types'
import { isPromise } from '@jibrelcom/ui'
import noop from 'lodash-es/noop'

const promiseActivation = (
  activation: ActivationFn,
  toState: State,
  fromState: State,
): Promise<boolean | void> => {
  let resolve = noop
  let reject = noop

  const p = new Promise<boolean | void>((res, rej) => {
    resolve = res
    reject = rej
  })

  const done = (err: any, state: State): void => {
    if (err) {
      return reject(err)
    }
    if (state) {
      return resolve(state)
    }
    return resolve(true)
  }

  const result = activation(toState, fromState, done)

  if (isPromise(result)) {
    resolve()
    return result
  }

  return p
}


const composeActivations = (
  activations: ActivationFnFactory[],
) => (
  router: Router,
  dependencies: RouterDependencies,
) => async (
  toState: State,
  fromState: State,
): Promise<boolean> => {
  for (let i = 0; i < activations.length; i++) {
    const activation = activations[i](router, dependencies)
    const result = await promiseActivation(activation, toState, fromState)
    if (result === false) {
      return false
    }
  }

  return true
}

export default composeActivations
