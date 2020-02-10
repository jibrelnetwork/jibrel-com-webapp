import get from 'lodash-es/get'
import { i18n } from '@jibrelcom/i18n'
import { createModel } from '@rematch/core'

import axios from '../axios'

import {
  Document,
  KYCState,
  KYCStatus,
} from '../types/kyc'

export const kyc = createModel({
  state: {
    status: KYCStatus.unverified,
    documents: {},
  },
  effects: () => ({
    async uploadDocument (file: File): Promise<string> {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const { data: { data } } = await axios.post('/v1/kyc/document', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })

        return data.id
      } catch (error) {
        const { response } = error

        if (!response) {
          throw Error(i18n._('form.error.upload.noConnection'))
        }

        const { status, data } = response

        if (status === 413) {
          throw Error(i18n._('form.error.upload.tooLarge'))
        }

        if (status === 400) {
          throw Error(get(data, 'errors.file[0].message', i18n._('form.error.upload.error')))
        }

        throw Error(i18n._('form.error.upload.error'))
      }
    },
  }),
  reducers: {
    removeDocument: (state: KYCState, fieldName: string): KYCState => ({
      ...state,
      documents: {
        ...state.documents,
        [fieldName]: undefined,
      },
    }),
    setDocumentLoading: (state: KYCState, fieldName: string): KYCState => ({
      ...state,
      documents: {
        ...state.documents,
        [fieldName]: {
          ...(state.documents[fieldName] || {}),
          isLoading: true,
        },
      },
    }),
    setDocument: (state: KYCState, {
      fieldName,
      data,
    }: {
      fieldName: string;
      data: Document;
    }): KYCState => ({
      ...state,
      documents: {
        ...state.documents,
        [fieldName]: {
          ...data,
          isLoading: false,
        },
      },
    }),
  },
})
