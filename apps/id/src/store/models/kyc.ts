import { createModel } from '@rematch/core'

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
    async uploadDocument ({
      file,
      fieldName,
    }: {
      file: File | void;
      fieldName: string;
    }): Promise<string | void> {
      try {
        if (!file) {
          this.removeDocument(fieldName)

          return
        }

        this.setDocumentLoading(fieldName)
        const formData = new FormData()
        formData.append('file', file)

        const { data: { data } } = await axios.post('/v1/kyc/document', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })

        this.setDocument({
          fieldName,
          data: {
            id: data.id,
            fileName: file.name,
            fileSize: file.size,
          },
        })

        return data.id
      } catch (error) {
        console.error(error)

        this.setDocument({
          fieldName,
          data: {
            id: undefined,
            fileName: undefined,
            fileSize: undefined,
            error: 'Upload error',
          },
        })
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
