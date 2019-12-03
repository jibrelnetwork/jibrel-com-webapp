import { FieldMetaState } from 'react-final-form'
import { MessageType, GenericFieldValue } from './types'

export const getMessage = ({
  meta,
  hint,
  success,
}: {
  meta: FieldMetaState<GenericFieldValue>;
  hint?: string;
  success?: string;
}): {
  messageType: MessageType | void;
  message: string | void;
} => {
  if (!meta) {
    return {
      messageType: undefined,
      message: undefined,
    }
  }

  if (!meta.dirtySinceLastSubmit && meta.submitError) {
    return {
      messageType: MessageType.error,
      message: meta.submitError,
    }
  }

  if (meta.touched && meta.error && !meta.active) {
    return {
      messageType: MessageType.error,
      message: meta.error,
    }
  }

  if (!meta.error && success) {
    return {
      messageType: MessageType.success,
      message: success,
    }
  }

  if (!meta.error && hint) {
    return {
      messageType: MessageType.info,
      message: hint,
    }
  }

  return {
    messageType: undefined,
    message: undefined,
  }
}
