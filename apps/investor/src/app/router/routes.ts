import { RouteEnhanced } from './types'
import { isLoggedIn } from './activations'

const ROUTER_ROOT = ''

export const routes: RouteEnhanced[] = [
  {
    name: 'Deposit',
    path: '/deposit',
    canActivate: isLoggedIn,
  },

  {
    name: 'Invest',
    path: '/invest/:slug',
    canActivate: isLoggedIn,
  },
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
