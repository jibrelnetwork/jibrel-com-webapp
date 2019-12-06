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
    status: UserStatus.ANONYMOUS,
    languageCode: LanguageCode.en,
  },
})
