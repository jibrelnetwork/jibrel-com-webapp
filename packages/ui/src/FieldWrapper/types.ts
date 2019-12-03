import { FieldProps, FieldRenderProps } from 'react-final-form'

export enum MessageType {
  info = 'info',
  error = 'error',
  success = 'success',
}

export type GenericFieldValue = string | number | boolean

export type GenericFieldRenderProps = FieldRenderProps<GenericFieldValue, HTMLElement>
export type GenericFieldProps = FieldProps<GenericFieldValue, GenericFieldRenderProps>
