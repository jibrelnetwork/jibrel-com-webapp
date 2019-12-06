import { Route } from 'router5'
import { redirectToDefaultIfLanguageUnavailable } from './activations/redirectToDefaultIfLanguageUnavailable'

const ROUTER_ROOT = '/id'

export const routes: Route[] = [
  {
    name: 'Account',
    path: `${ROUTER_ROOT}/`,
  },
  {
    name: 'Security',
    path: `${ROUTER_ROOT}/security`,
  },

  {
    name: 'redirect!Login',
    path: `${ROUTER_ROOT}/login`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'Login',
    path: `${ROUTER_ROOT}/:lang/login`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!SignUp',
    path: `${ROUTER_ROOT}/signup`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'SignUp',
    path: `${ROUTER_ROOT}/:lang/signup`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!Forgot',
    path: `${ROUTER_ROOT}/forgot`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'Forgot',
    path: `${ROUTER_ROOT}/:lang/forgot`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!Reset',
    path: `${ROUTER_ROOT}/reset`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'Reset',
    path: `${ROUTER_ROOT}/:lang/reset`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'redirect!VerifyEmail',
    path: `${ROUTER_ROOT}/verify/email`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },
  {
    name: 'VerifyEmail',
    path: `${ROUTER_ROOT}/:lang/verify/email`,
    canActivate: redirectToDefaultIfLanguageUnavailable,
  },

  {
    name: 'VerifyPhoneNumber',
    path: `${ROUTER_ROOT}/verify/phonenumber`,
  },

  {
    name: 'KYCStart',
    path: `${ROUTER_ROOT}/kyc`,
  },
  {
    name: 'KYCInvestor',
    path: `${ROUTER_ROOT}/kyc/investor`,
  },
  {
    name: 'KYCInvestor.Personal',
    path: `${ROUTER_ROOT}/kyc/investor/personal`,
  },
  {
    name: 'KYCInvestor.Residency',
    path: `${ROUTER_ROOT}/kyc/investor/residency`,
  },
  {
    name: 'KYCInvestor.Income',
    path: `${ROUTER_ROOT}/kyc/investor/income`,
  },
  {
    name: 'KYCInvestor.Status',
    path: `${ROUTER_ROOT}/kyc/investor/status`,
  },
  {
    name: 'KYCCompany',
    path: `${ROUTER_ROOT}/kyc/company`,
  },
  {
    name: 'KYCCompany.Information',
    path: `${ROUTER_ROOT}/kyc/company/information`,
  },
  {
    name: 'KYCCompany.Office',
    path: `${ROUTER_ROOT}/kyc/company/office`,
  },
  {
    name: 'KYCCompany.Contact',
    path: `${ROUTER_ROOT}/kyc/company/contact`,
  },
  {
    name: 'KYCCompany.Beneficiary',
    path: `${ROUTER_ROOT}/kyc/company/beneficiary`,
  },
  {
    name: 'KYCCompany.Director',
    path: `${ROUTER_ROOT}/kyc/company/director`,
  },
  {
    name: 'KYCCompany.Status',
    path: `${ROUTER_ROOT}/kyc/company/status`,
  },
]
