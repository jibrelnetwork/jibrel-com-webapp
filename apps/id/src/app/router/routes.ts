import composeActivations from './utils/composeActivations'
import { RouteEnhanced } from './types'

import {
  redirectLang,
  isLoggedIn,
  checkNextPageAvailable,
  verifyPhone,
  checkKYCPending,
  checkKYCSubmitted,
} from './activations'

const ROUTER_ROOT = ''

export const routes: RouteEnhanced[] = [
  {
    name: 'Account',
    path: '/',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
    ]),
  },
  {
    name: 'Security',
    path: '/security',
  },

  {
    name: 'redirect!Login',
    path: '/login?:source&:slug',
    canActivate: redirectLang,
  },
  {
    name: 'Login',
    path: '/:lang/login?:source&:slug',
    canActivate: composeActivations([
      redirectLang,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'redirect!SignUp',
    path: '/signup',
    canActivate: redirectLang,
  },
  {
    name: 'SignUp',
    path: '/:lang/signup',
    canActivate: composeActivations([
      redirectLang,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'redirect!Forgot',
    path: '/forgot',
    canActivate: redirectLang,
  },
  {
    name: 'Forgot',
    path: '/:lang/forgot',
    canActivate: composeActivations([
      redirectLang,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'redirect!Reset',
    path: '/reset?:token',
    canActivate: redirectLang,
  },
  {
    name: 'Reset',
    path: '/:lang/reset?:token',
    canActivate: composeActivations([
      redirectLang,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'EmailVerification',
    path: '/email-verification',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'VerifyEmail',
    path: '/verify/email?:token',
    canActivate: composeActivations([
      redirectLang,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'VerifyPhone',
    path: '/verify/phone',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
      verifyPhone,
    ]),
  },
  {
    name: 'VerifyPhoneCode',
    path: '/verify/phone/code',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
      verifyPhone,
    ]),
  },

  {
    name: 'KYC',
    path: '/kyc',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
      checkKYCSubmitted,
    ]),
    // onActivate: get kyc status from backend
    // canActivate: if kyc status is "not submitted", then true
    //    else redirect to CMS
    /*
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
    ],
    */
  },

  {
    name: 'KYCIndividual',
    path: '/kyc/individual',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'KYCCompany',
    path: '/kyc/company',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
    ]),
  },

  {
    name: 'KYCSuccess',
    path: '/kyc/success',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
      checkKYCPending,
    ]),
  },

  {
    name: 'Invest',
    path: '/invest',
    canActivate: composeActivations([
      isLoggedIn,
      checkNextPageAvailable,
      checkKYCSubmitted,
    ]),
  },
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
