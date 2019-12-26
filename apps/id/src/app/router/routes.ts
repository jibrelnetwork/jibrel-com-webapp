import composeActivations from './utils/composeActivations'
import { RouteEnhanced } from './types'

import {
  redirectLang,
  isLoggedIn,
  isValidVerificationStep,
  verifyPhone,
} from './activations'

const ROUTER_ROOT = ''

export const routes: RouteEnhanced[] = [
  {
    name: 'Account',
    path: '/',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
    ]),
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
    canActivate: composeActivations([
      redirectLang,
      isValidVerificationStep,
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
      isValidVerificationStep,
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
      isValidVerificationStep,
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
      isValidVerificationStep,
    ]),
  },

  {
    name: 'EmailVerification',
    path: '/email-verification',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
    ]),
  },

  {
    name: 'VerifyEmail',
    path: '/verify/email?:token',
    canActivate: composeActivations([
      redirectLang,
      isValidVerificationStep,
    ]),
  },

  {
    name: 'VerifyPhone',
    path: '/verify/phone',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
      verifyPhone,
    ]),
  },
  {
    name: 'VerifyPhoneCode',
    path: '/verify/phone/code',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
      verifyPhone,
    ]),
  },

  {
    name: 'KYC',
    path: '/kyc',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
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
      isValidVerificationStep,
    ]),
  },
  {
    name: 'KYCCompany',
    path: '/kyc/company',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
    ]),
  },
  {
    name: 'KYCSuccess',
    path: '/kyc/success',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
    ]),
  },
  {
    name: 'Invest',
    path: '/invest',
    canActivate: composeActivations([
      isLoggedIn,
      isValidVerificationStep,
    ]),
  },
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
