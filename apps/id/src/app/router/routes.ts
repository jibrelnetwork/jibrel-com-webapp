import { Route } from 'router5'
import composeActivations from './utils/composeActivations'
import {
  redirectLang,
  isLoggedIn,
  isValidVerificationStep,
  verifyPhone,
} from './activations'

const ROUTER_ROOT = ''

export const routes: Route[] = [
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
    canActivate: composeActivations([
      isLoggedIn,
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
  },
  {
    name: 'KYCInvestor',
    path: '/kyc/investor',
    children: [
      {
        name: 'Personal',
        path: '/personal',
      },
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
    name: 'KYCCompany',
    path: '/kyc/company',
    children: [
      {
        name: 'Information',
        path: '/information',
      },
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
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
