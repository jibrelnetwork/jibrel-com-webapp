import axios from '../axios'
import { createModel } from '@rematch/core'

export enum KYCStatus {
  NONE = 'NONE',
  REVIEW = 'REVIEW',
  REJECTED = 'REJECTED',
  VERIFIED = 'VERIFIED',
}

export const kyc = createModel({
  state: {
    status: KYCStatus.NONE,
    fields: {
      passportDocument: null,
    },
  },
  effects: () => ({
    async uploadDocument ({
      file,
      fieldName,
    }): Promise<void> {
      try {
        if (!file) {
          this.removeDocument(fieldName)

          return
        }

        this.setDocumentLoading(fieldName)

        const formData = new FormData()
        formData.append('file', file)

        console.log(file, fieldName)

        const { data } = await axios.post('/v1/kyc/document', formData, {
          headers: { 'content-type': 'multipart/form-data' }
        })

        throw new Error('hello')

        this.setDocument({
          id: data.id,
          name: fieldName,
          fileName: file.name,
          fileSize: file.size,
        })

        return
      } catch (error) {
        console.error(error)

        this.setDocument({
          id: null,
          name: fieldName,
          value: file.name,
          error: 'Upload error',
        })
      }
    },
  }),
  reducers: {
    removeDocument: (state, name) => ({
      ...state,
      fields: {
        ...state.fields,
        [name]: null,
      },
    }),
    setDocumentLoading: (state, name) => {
      console.log('setDocumentLoading', state.fields[name])

      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: {
            ...(state.fields[name] || {}),
            isLoading: true,
          },
        },
      }
    },
    setDocument: (state, {
      id,
      name,
      error,
      fileName,
      fileSize,
    }) => ({
      ...state,
      fields: {
        ...state.fields,
        [name]: {
          id,
          error,
          fileName,
          fileSize,
          isLoading: false,
        },
      }
    }),
  },
})
