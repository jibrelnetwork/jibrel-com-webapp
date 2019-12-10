import { redirectToDefaultIfLanguageUnavailable } from './activations/redirectToDefaultIfLanguageUnavailable'

const ROUTER_ROOT = ''

import { RouteEnhanced } from './types'

export const routes: RouteEnhanced[] = [
  {
    name: 'Account',
    path: '/',
  },
  {
    name: 'Security',
    path: '/security',
  },

  {
    name: 'redirect!Login',
    path: '/login',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'Login',
    path: '/:lang/login',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!SignUp',
    path: '/signup',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'SignUp',
    path: '/:lang/signup',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!Forgot',
    path: '/forgot',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'Forgot',
    path: '/:lang/forgot',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!Reset',
    path: '/reset',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'Reset',
    path: '/:lang/reset',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!VerifyEmail',
    path: '/verify/email',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'VerifyEmail',
    path: '/:lang/verify/email',
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'VerifyPhone',
    path: '/verify/phone',
    // onActivate: get phone verification status from backend
    // canActivate: if phone is not verified, then true
    //    else redirect to KYC
    children: [
      {
        name: 'Code',
        path: '/code',
      },
      {
        name: 'Failure',
        path: '/failure',
      },
    ],
  },

  {
    name: 'KYC',
    path: '/kyc',
    // onActivate: get kyc status from backend
    // canActivate: if kyc status is "not submitted", then true
    //    else redirect to CMS
    children: [
      {
        name: 'Individual',
        path: '/individual',
        children: [
          {
            name: 'Residency',
            path: '/residency',
          },
          {
            name: 'Income',
            path: '/income',
          },
          {
            name: 'Status',
            path: '/status',
          },
        ],
      },
      {
        name: 'Company',
        path: '/company',
        children: [
          {
            name: 'Office',
            path: '/office',
          },
          {
            name: 'Contact',
            path: '/contact',
          },
          {
            name: 'Beneficiary',
            path: '/beneficiary',
          },
          {
            name: 'Director',
            path: '/director',
          },
          {
            name: 'Status',
            path: '/status',
          },
        ],
      },
    ]
  },
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
