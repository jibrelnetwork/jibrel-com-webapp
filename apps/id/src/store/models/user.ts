import mapValues from 'lodash-es/mapValues'
import { FORM_ERROR } from 'final-form'
import { createModel, ModelConfig } from '@rematch/core'
import { actions as routerActions } from 'redux-router5'

import { RootState } from 'store'
import { LanguageCode } from 'data/languages'

import axios from '../axios'
import getUserLimits from './getUserLimits'

import {
  UserStatus,
  UserState,
  FormSubmitResult,
  Profile,
  LoginFormFields,
  SignUpFormValues,
  ResetPasswordFormFields,
  ForgotPasswordFormFields,
  EmailVerificationFormFields,
  KYCStatus,
} from '../types'

export const user: ModelConfig<UserState> = createModel<UserState>({
  state: {
    profile: undefined,
    limits: undefined,
    status: undefined,
    languageCode: LanguageCode.en,
  },
  effects: (dispatch) => ({
    async updateLimits (): Promise<void> {
      try {
        const limits = await axios.get('/v1/user/limits')
        const userLimits = getUserLimits(limits.data)
        this.setProfileLimits(userLimits)
        dispatch.phone.setLimits(userLimits)

        return
      } catch (error) {
        console.error(error)
        this.setProfileLimits(undefined)
      }
    },
    async updateProfile (): Promise<void> {
      try {
        const { data } = await axios
          .get('/v1/user/profile')

        this.setProfile(data.data)

        this.updateLimits()

        return
      } catch (error) {
        if (!error.response) {
          // FIXME: should show global connection error
          throw error
        }

        this.setProfile(undefined)
      }
    },
    setProfile (profile: Profile | void): void {
      if (!profile) {
        this.setProfileData(undefined)
        this.setStatus(undefined)

        return
      }

      this.setProfileData(profile)

      if (profile.isPhoneConfirmed) {
        if (profile.kycStatus === KYCStatus.verified || profile.kycStatus === KYCStatus.advanced) {
          this.setStatus(UserStatus.VERIFIED)
        } else {
          this.setStatus(UserStatus.KYC_UNSET)
        }
      } else if (profile.isEmailConfirmed) {
        this.setStatus(UserStatus.PHONE_UNVERIFIED)
      } else if (profile.uuid) {
        this.setStatus(UserStatus.EMAIL_UNVERIFIED)
      }

      this.setLanguageCode(profile.language)
    },
    async signUp ({
      firstName,
      lastName,
      email,
      password,
      terms,
    }: SignUpFormValues, rootState): FormSubmitResult<SignUpFormValues> {
      const language = rootState.user.languageCode

      try {
        const { data } = await axios
          .post('/v1/auth/registration', {
            userName: `${firstName} ${lastName}`,
            email,
            password,
            language,
            isAgreedTerms: terms,
            isAgreedPrivacyPolicy: terms,
          })

        this.setProfile(data.data)

        dispatch(routerActions.navigateTo(
          'EmailVerification',
          { lang: language },
        ))

        return
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const { status, data } = error.response
        if (status === 400) {
          return mapValues(data.errors, (e) => e[0].message)
        }

        throw error
      }
    },
    async login ({
      email,
      password,
    }: LoginFormFields, rootState): FormSubmitResult<LoginFormFields> {
      const language = rootState.user.languageCode

      try {
        const { data } = await axios.post('/v1/auth/login', {
          email,
          password,
        })

        this.setProfile(data.data)

        dispatch(routerActions.navigateTo(
          'EmailVerification',
          { lang: language },
        ))

        return
      } catch (error) {
        if (!error.response) {
          throw error
        }

        const {
          data,
          status,
        } = error.response

        if (status === 400) {
          return mapValues(data.errors, (e) => e[0].message)
        } else if (status === 403) {
          return { [FORM_ERROR]: 'Permission denied' }
        }

        throw error
      }
    },
    async logout (_: void, rootState: RootState): Promise<void> {
      await axios.post('/v1/auth/logout')
      this.setProfile(undefined)

      dispatch(routerActions.navigateTo(
        'Login',
        { lang: rootState.user.languageCode },
      ))

      return
    },
    async sendEmailLink ({
      email,
    }: EmailVerificationFormFields): FormSubmitResult<EmailVerificationFormFields> {
      try {
        await axios.post('/v1/auth/registration/confirmation-email-resend', { email })

        const { data } = await axios.get('/v1/user/limits')
        this.setProfileLimits(getUserLimits(data))

        return
      } catch (error) {
        console.error(error)
        return { [FORM_ERROR]: 'We are unable to deliver email to your inbox.' }
      }
    },
    async checkEmailToken (key: string): Promise<void> {
      await axios.post('/v1/auth/registration/email-verify', { key })
      this.updateProfile()

      return
    },
    async sendForgotLink ({
      email,
    }: ForgotPasswordFormFields): FormSubmitResult<ForgotPasswordFormFields> {
      try {
        await axios.post('/v1/auth/password/reset', { email })

        return
      } catch (error) {
        console.error(error)
        return { [FORM_ERROR]: 'We are unable to deliver email to your inbox.' }
      }
    },
    async checkResetToken (key: string, rootState: RootState): Promise<void> {
      try {
        await axios.post('/v1/auth/password/reset/activate', { key })
      } catch (error) {
        console.error(error)

        dispatch(routerActions.navigateTo(
          'Login',
          { lang: rootState.user.languageCode },
        ))
      }
    },
    async resetPassword ({
      key,
      password,
    }: ResetPasswordFormFields): FormSubmitResult<ResetPasswordFormFields> {
      try {
        await axios.post('/v1/auth/password/reset/complete', {
          key,
          password,
        })

        this.updateProfile()

        return
      } catch (error) {
        if (error.response && (error.response.status === 400)) {
          return error.formValidation
        }

        throw error
      }
    },
  }),
  reducers: {
    setStatus: (state, payload): UserState => ({
      ...state,
      status: payload,
    }),
    setLanguageCode: (state, payload): UserState => ({
      ...state,
      languageCode: payload,
    }),
    setProfileData: (state, payload): UserState => ({
      ...state,
      profile: payload,
    }),
    setProfileLimits: (state, payload): UserState => ({
      ...state,
      limits: payload,
    }),
  }
})
