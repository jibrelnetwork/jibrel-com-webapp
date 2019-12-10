import { createModel } from '@rematch/core'

import { LanguageCode } from '../../data/languages'

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
    setProfile (profile): void {
      if (profile.isPhoneConfirmed) {
        this.setStatus(UserStatus.VERIFIED)
      } else if (profile.isEmailConfirmed) {
        this.setStatus(UserStatus.PHONE_UNVERIFIED)
      } else if (profile.uuid) {
        this.setStatus(UserStatus.EMAIL_UNVERIFIED)
      }

      this.setLanguageCode(profile.language)
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
  }
})
