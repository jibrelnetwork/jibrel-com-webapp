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
    name: 'VerifyPhoneNumber',
    path: '/verify/phonenumber',
  },

  {
    name: 'KYCStart',
    path: '/kyc',
  },
  {
    name: 'KYCInvestor',
    path: '/kyc/investor',
  },
  {
    name: 'KYCInvestor.Personal',
    path: '/kyc/investor/personal',
  },
  {
    name: 'KYCInvestor.Residency',
    path: '/kyc/investor/residency',
  },
  {
    name: 'KYCInvestor.Income',
    path: '/kyc/investor/income',
  },
  {
    name: 'KYCInvestor.Status',
    path: '/kyc/investor/status',
  },
  {
    name: 'KYCCompany',
    path: '/kyc/company',
  },
  {
    name: 'KYCCompany.Information',
    path: '/kyc/company/information',
  },
  {
    name: 'KYCCompany.Office',
    path: '/kyc/company/office',
  },
  {
    name: 'KYCCompany.Contact',
    path: '/kyc/company/contact',
  },
  {
    name: 'KYCCompany.Beneficiary',
    path: '/kyc/company/beneficiary',
  },
  {
    name: 'KYCCompany.Director',
    path: '/kyc/company/director',
  },
  {
    name: 'KYCCompany.Status',
    path: '/kyc/company/status',
  },
].map((route) => ({
  ...route,
  path: ROUTER_ROOT + route.path,
}))
