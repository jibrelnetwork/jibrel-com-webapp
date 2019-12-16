import {
  UserLimit,
  UserLimits,
} from '../types'

/* eslint-disable @typescript-eslint/camelcase */
const getUserLimits = ({
  upload_kyc_document,
  resend_verification_sms,
  resend_verification_call,
  resend_verification_email,
}: {
  upload_kyc_document: UserLimit;
  resend_verification_sms: UserLimit;
  resend_verification_call: UserLimit;
  resend_verification_email: UserLimit;
}): UserLimits => ({
  uploadKYCDocument: upload_kyc_document,
  resendVerificationSMS: resend_verification_sms,
  resendVerificationCall: resend_verification_call,
  resendVerificationEmail: resend_verification_email,
})
/* eslint-enable @typescript-eslint/camelcase */

export default getUserLimits
