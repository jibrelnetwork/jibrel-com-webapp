import { createModel } from '@rematch/core'
import get from 'lodash-es/get'

import axios from '../axios'

import {
  Document,
  KYCState,
  KYCStatus,
} from '../types/kyc'

export const kyc = createModel({
  state: {
    status: KYCStatus.NONE,
    documents: {},
  },
  effects: () => ({
    async uploadDocument (file: File): Promise<string> {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const {data: {data}} = await axios.post('/v1/kyc/document', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })

        return data.id
      } catch (error) {
        const { response } = error

        // FIXME: Errors should be translated
        if (!response) {
          throw Error('No connection')
        }

        const { status, data } = response

        if (status === 413) {
          throw Error('File too large')
        }

        if (status === 400) {
          throw Error(get(data, 'errors.file[0].message', 'Upload error'))
        }

        throw Error('Upload error')
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
