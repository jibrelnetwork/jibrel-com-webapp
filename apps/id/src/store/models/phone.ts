import { FORM_ERROR } from 'final-form'
import { i18n } from '@jibrelcom/i18n'
import { createModel } from '@rematch/core'
import { actions as routerActions } from 'redux-router5'

import { RootState } from 'store'

import axios from '../axios'

import {
  APIResponse,
  FormSubmitResult,
  Phone,
  PhoneAPINumberFields,
  PhoneAPIPinFields,
  PhoneConfirmationVariant,
  PhoneVerificationState,
  PhoneVerificationStatus,
  UserLimits,
} from '../types'

const INTERVAL_MULTIPLY = 1.5
const checkPhoneUntilResult = async (interval = 3000): Promise<Phone> => {
  const { data } = await axios
    .get<APIResponse<Phone>>(
      '/v1/kyc/phone',
      {
        'axios-retry': {
          retries: Infinity,
          retryDelay: attempts => attempts * interval * INTERVAL_MULTIPLY,
          retryCondition: response => {
            const { status } = response.response.data.data
            return status === PhoneVerificationStatus.code_sent
              || status === PhoneVerificationStatus.code_submitted
          }
        }
      }
    )

  return data.data
}

export const phone = createModel<PhoneVerificationState>({
  state: {
    status: null,
    isLoading: false,
    maskedNumber: '',
    requestAvailableAt: null,
    confirmationVariant: null,
  },
  selectors: {
    timeout () {
      return (rootState: RootState): number => {
        if (rootState.phone.requestAvailableAt === null) {
          return -1
        }

        return Math.max(
          0,
          Math.round(
            (rootState.phone.requestAvailableAt - Date.now())
            / 1000
          )
        )
      }
    }
  },
  effects: (dispatch) => ({
    async init (): Promise<void> {
      try {
        const { data } = await axios.get<APIResponse<Phone>>('/v1/kyc/phone')

        this.setPhone(data.data)
      } catch (error) {
        if (!error.response) {
          // FIXME: should show global connection error
          throw error
        }

        const { status } = error.response

        if (status === 403) {
          dispatch.user.setProfile(null)
          return
        }

        throw error
      }
    },
    async setNumber (
      payload: PhoneAPINumberFields,
      rootState,
    ): FormSubmitResult<PhoneAPINumberFields> {
      const { status, maskedNumber } = rootState.phone

      if (status === PhoneVerificationStatus.verified) {
        dispatch(routerActions.navigateTo('KYC'))
        return
      }

      try {
        const { data } = await axios.request<APIResponse<Phone>>({
          url: '/v1/kyc/phone',
          method: maskedNumber
            ? 'put'
            : 'post',
          data: {
            number: payload.countryCode + payload.number,
          },
        })

        this.setPhone(data.data)
        await this.requestSMS()
        dispatch(routerActions.navigateTo('VerifyPhoneCode'))
      } catch (error) {
        if (!error.response) {
          // FIXME: should show global connection error
          throw error
        }

        const { status } = error.response

        if (status === 400) {
          const { data } = error.response
          if (data.errors.number.find((e) => e.code === 'same')) {
            dispatch(routerActions.navigateTo('VerifyPhoneCode'))
            return
          }

          return error.formValidation
        }
        if (status === 403) {
          return this.handle403()
        }
        if (status === 409) {
          return await this.handle409()
        }
        if (status === 429) {
          return await this.handle429()
        }

        return {
          [FORM_ERROR]: i18n._('form.error.phone.unexpected'),
        }
      }
    },
    async requestSMS (): Promise<void> {
      try {
        this.setIsLoading(true)
        await axios.post<APIResponse<Phone>>('/v1/kyc/phone/resend-sms')
        this.setStatus(PhoneVerificationStatus.code_requested)
        this.setConfirmationVariant(PhoneConfirmationVariant.sms)
        this.setIsLoading(false)
      } catch (err) {
        await dispatch.user.updateLimits()
        this.setIsLoading(false)
      }
    },
    async requestCall (): Promise<void> {
      try {
        this.setIsLoading(true)
        await axios.post<APIResponse<Phone>>('/v1/kyc/phone/call-me')
        this.setStatus(PhoneVerificationStatus.code_requested)
        this.setConfirmationVariant(PhoneConfirmationVariant.call)
        this.setIsLoading(false)
      } catch (err) {
        await dispatch.user.updateLimits()
        this.setIsLoading(false)
      }
    },
    setLimits (payload: UserLimits): void {
      if (payload.resendVerificationSMS) {
        const timeout = payload.resendVerificationSMS.leftSeconds * 1000
        this.setRequestAvailableAt(
          new Date(Date.now() + timeout)
        )
      } else {
        this.setRequestAvailableAt(new Date())
      }
    },
    async submitCode (
      payload: PhoneAPIPinFields,
    ): FormSubmitResult<PhoneAPIPinFields> {
      try {
        this.setIsLoading(true)
        await axios.post<APIResponse<FormSubmitResult<PhoneAPIPinFields>>>(
          '/v1/kyc/phone/verify',
          payload,
        )
        const phone = await checkPhoneUntilResult()
        if (phone.status === PhoneVerificationStatus.code_incorrect) {
          this.setIsLoading(false)

          return {
            pin: i18n._('form.error.phone.pin'),
          }
        }

        if (phone.status === PhoneVerificationStatus.verified) {
          dispatch(routerActions.navigateTo('KYC'))
          return
        }

        this.setPhone(phone)
        await dispatch.user.updateLimits()
        this.setIsLoading(false)
      } catch (error) {
        if (!error.response) {
          // FIXME: should show global connection error
          throw error
        }

        const { status } = error.response

        if (status === 400) {
          return error.formValidation
        }
        if (status === 403) {
          return this.handle403()
        }
        if (status === 409) {
          return await this.handle409()
        }
        if (status === 429) {
          return await this.handle429()
        }

        console.error(error)

        return {
          [FORM_ERROR]: i18n._('form.error.phone.unexpected')
        }
      }
    },
    handle403 (payload, rootState): void {
      dispatch.user.setProfile(null)
      dispatch(routerActions.navigateTo(
        'Login',
        { lang: rootState.user.languageCode },
      ))
      return
    },
    async handle409 (payload, rootState): Promise<void> {
      await this.init()

      if (rootState.phone.status === PhoneVerificationStatus.verified) {
        dispatch(routerActions.navigateTo('KYC'))
        return
      }

      window.location.reload()
      return
    },
    async handle429 (): Promise<void> {
      await this.init()
      dispatch(routerActions.navigateTo('VerifyPhoneCode'))
      return
    },
  }),
  reducers: {
    setPhone: (state, payload: Phone): PhoneVerificationState => {
      return {
        ...state,
        status: payload.status,
        maskedNumber: payload.number,
      }
    },
    setStatus: (state, payload): PhoneVerificationState => ({
      ...state,
      status: payload,
    }),
    setConfirmationVariant: (state, payload): PhoneVerificationState => ({
      ...state,
      confirmationVariant: payload,
    }),
    setRequestAvailableAt: (state, payload): PhoneVerificationState => ({
      ...state,
      requestAvailableAt: payload,
    }),
    setIsLoading: (state, payload): PhoneVerificationState => ({
      ...state,
      isLoading: payload,
    })
  }
})
