import { Route } from 'router5'
import { redirectToDefaultIfLanguageUnavailable } from './activations/redirectToDefaultIfLanguageUnavailable'

const ROUTER_ROOT = '/id'

export const routes: Route[] = [
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
    path: '/verify/phonenumber',
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
    name: 'KYCStart',
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
