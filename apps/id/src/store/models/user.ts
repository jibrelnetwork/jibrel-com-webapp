import { createModel } from '@rematch/core'

import { LanguageCode } from '../../data/languages'

export enum UserStatus {
  ANONYMOUS = 'ANONYMOUS',
  EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED',
  PHONE_UNVERIFIED = 'PHONE_UNVERIFIED',
  BANNED = 'BANNED',
}

export const user = createModel({
  state: {
    status: undefined,
    languageCode: undefined,
  },
  effects: (dispatch) => ({
    async profile (): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      dispatch.user.status(UserStatus.ANONYMOUS)
      dispatch.user.languageCode(LanguageCode.en)
    }
  }),
  reducers: {
    status: (state, payload): UserStatus => payload,
    languageCode: (state, payload): LanguageCode => payload,
  }
})
