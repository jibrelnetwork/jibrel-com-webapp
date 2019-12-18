import composeActivations from './utils/composeActivations'
import { RouteEnhanced } from './types'

import {
  redirectLang,
  isLoggedIn,
  isValidVerificationStep,
} from './activations'

const ROUTER_ROOT = ''

export const routes: RouteEnhanced[] = [
  {
    name: 'Account',
    path: '/',
    forwardTo: 'Login',
  },
  {
    name: 'Security',
    path: '/security',
  },

  {
    name: 'redirect!Login',
    path: '/login',
    canActivate: redirectLang,
  },
  {
    name: 'Login',
    path: '/:lang/login',
    canActivate: redirectLang,
  },

  {
    name: 'redirect!SignUp',
    path: '/signup',
    canActivate: redirectLang,
  },
  {
    name: 'SignUp',
    path: '/:lang/signup',
    canActivate: redirectLang,
  },

  {
    name: 'EmailVerification',
    path: '/email-verification',
    canActivate: redirectLang,
  },

  {
    name: 'redirect!Forgot',
    path: '/forgot',
    canActivate: redirectLang,
  },
  {
    name: 'Forgot',
    path: '/:lang/forgot',
    canActivate: redirectLang,
  },

  {
    name: 'redirect!Reset',
    path: '/reset?:token',
    canActivate: redirectLang,
  },
  {
    name: 'Reset',
    path: '/:lang/reset?:token',
    canActivate: redirectLang,
  },

  {
    name: 'redirect!VerifyEmail',
    path: '/verify/email?:token',
    canActivate: redirectLang,
  },
  {
    name: 'VerifyEmail',
    path: '/:lang/verify/email?:token',
    canActivate: redirectLang,
  },

  {
    name: 'VerifyPhone',
    path: '/verify/phone',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
    ]),
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
    canActivate: isLoggedIn,
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
