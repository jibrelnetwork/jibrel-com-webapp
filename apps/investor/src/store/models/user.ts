import { LanguageCode } from '@jibrelcom/i18n'

import {
  createModel,
  ModelConfig,
} from '@rematch/core'

import settings from 'app/settings'
import { RootState } from 'store'

import axios from '../axios'

import {
  Profile,
  UserState,
  UserStatus,
} from '../types'

export const user: ModelConfig<UserState> = createModel<UserState>({
  state: {
    profile: undefined,
    status: undefined,
    languageCode: LanguageCode.en,
  },
  effects: () => ({
    async updateProfile (): Promise<void> {
      try {
        const { data } = await axios.get('/v1/user/profile')
        this.setProfile(data.data)

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
      this.setLanguageCode(profile.language)
      this.setStatus(UserStatus[profile.kycStatus])
    },
    async logout (_: void, rootState: RootState): Promise<void> {
      await axios.post('/v1/auth/logout')
      this.setProfile(undefined)

      window.location.href = `${settings.ID_ORIGIN}/${rootState.user.languageCode}/login`

      return
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
  }
})
