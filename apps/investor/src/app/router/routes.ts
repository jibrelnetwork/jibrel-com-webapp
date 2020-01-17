import composeActivations from './utils/composeActivations'
import { RouteEnhanced } from './types'

import {
  isLoggedIn,
  checkKYCStatus,
} from './activations'

const ROUTER_ROOT = ''

export const routes: RouteEnhanced[] = [
  {
    name: 'Invest',
    path: '/invest/:slug',
    canActivate: composeActivations([
      isLoggedIn,
      checkKYCStatus,
    ]),
  },

  {
    name: 'Pending',
    path: '/pending',
    canActivate: isLoggedIn,
  },

  {
    name: 'Unverified',
    path: '/unverified',
    canActivate: isLoggedIn,
  },
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
