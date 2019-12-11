import { createModel } from '@rematch/core'
import mapValues from 'lodash-es/mapValues'

import axios from '../axios'
import {
  Profile,
  SignUpFormValues,
  SignUpFormErrors,
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
  status: UserStatus | void;
  languageCode: string | void;
}

export const user = createModel<UserState>({
  state: {
    status: undefined,
    languageCode: undefined,
  },
  effects: (dispatch) => ({
    async updateProfile (): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      this.setStatus(UserStatus.ANONYMOUS)
      this.setLanguageCode(LanguageCode.en)
    },
    setProfile (profile: Profile): void {
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
    }: SignUpFormValues, rootState): Promise<SignUpFormErrors | void> {
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
