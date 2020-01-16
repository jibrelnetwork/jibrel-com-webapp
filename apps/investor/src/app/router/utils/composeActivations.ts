import composeActivations from '@jibrelcom/router/src/utils/composeActivations'

import {
  State,
  Router,
  ActivationFnFactory,
} from 'router5'

import { RouterDependencies } from '../types'

const compose = (items: ActivationFnFactory[]): (
  router: Router,
  dependencies: RouterDependencies,
) => (
  toState: State,
  fromState: State,
) => Promise<boolean> => composeActivations<RouterDependencies>(items)

export default compose
