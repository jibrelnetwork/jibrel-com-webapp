import mapValues from 'lodash-es/mapValues'
import { FORM_ERROR } from 'final-form'
import { createModel } from '@rematch/core'
import { actions as routerActions } from 'redux-router5'

import axios from '../axios'
import {
  UserStatus,
  UserState,
  FormSubmitResult,
  Profile,
} from '../types'
import {
  LoginFormFields,
  SignUpFormValues,
} from '../types/kyc'

export const user = createModel<UserState>({
  state: {
    status: undefined,
    languageCode: undefined,
  },
  effects: (dispatch) => ({
    async updateProfile (): Promise<void> {
      try {
        const { data } = await axios
          .get('/v1/user/profile')

        this.setProfile(data.data)
      } catch (error) {
        if (!error.response) {
          // FIXME: should show global connection error
          throw error
        }

        this.setProfile(null)
      }
    },
    setProfile (profile: Profile | null): void {
      if (!profile) {
        this.setStatus(UserStatus.ANONYMOUS)

        return
      } else if (profile.isPhoneConfirmed) {
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

      this.setProfile(null)

      dispatch(routerActions.navigateTo(
        'Login',
        { lang: language },
      ))

      return
    }
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
  }
})
