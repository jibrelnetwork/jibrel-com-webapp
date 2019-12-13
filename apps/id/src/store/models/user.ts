import mapValues from 'lodash-es/mapValues'
import { FORM_ERROR } from 'final-form'
import { createModel } from '@rematch/core'
import { actions as routerActions } from 'redux-router5'

import axios from '../axios'
import getUserLimits from './getUserLimits'

import {
  Profile,
  UserLimits,
  LoginFormFields,
  FormSubmitResult,
  SignUpFormValues,
  EmailVerificationFormFields,
} from '../types'

import { LanguageCode } from 'data/languages'

export enum UserStatus {
  ANONYMOUS = 'ANONYMOUS',
  EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED',
  PHONE_UNVERIFIED = 'PHONE_UNVERIFIED',
  VERIFIED = 'VERIFIED',
  BANNED = 'BANNED',
}

export interface UserState {
  profile: Profile | void;
  limits: UserLimits | void;
  status: UserStatus | void;
  languageCode: LanguageCode | void;
}

export const user = createModel<UserState>({
  state: {
    profile: undefined,
    limits: undefined,
    status: undefined,
    languageCode: LanguageCode.en,
  },
  effects: (dispatch) => ({
    async updateProfile (): Promise<void> {
      try {
        const { data } = await axios.get('/v1/user/profile')
        const limits = await axios.get('/v1/user/limits')

        this.setProfile(data.data)
        this.setProfileLimits(getUserLimits(limits.data))

        return
      } catch (error) {
        this.setProfile(undefined)

        throw error
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
        this.setStatus(UserStatus.VERIFIED)
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
    async logout (_: null, rootState): Promise<void> {
      const language = rootState.user.languageCode
      await axios.post('/v1/auth/logout')
      this.setProfile(undefined)

      dispatch(routerActions.navigateTo(
        'Login',
        { lang: language },
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
        return { [FORM_ERROR]: 'We are unable to deliver email to your inbox.' }
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
