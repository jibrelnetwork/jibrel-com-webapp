import { FieldMetaState } from 'react-final-form'
import { GenericFieldValue, MessageType } from './types'

export const getMessage = ({
  meta,
  hint,
  success,
  error,
  progress,
  isDependencyChanged = false,
}: {
  meta: FieldMetaState<GenericFieldValue>;
  hint?: string;
  success?: string;
  error?: string;
  progress?: string;
  isDependencyChanged?: boolean;
}): {
  messageType: MessageType | void;
  message: string | void;
} => {
  if (progress) {
    return {
      messageType: MessageType.info,
      message: progress,
    }
  }

  if (error) {
    return {
      messageType: MessageType.error,
      message: error,
    }
  }

  if (!meta) {
    return {
      messageType: undefined,
      message: undefined,
    }
  }

  if (!meta.dirtySinceLastSubmit && meta.submitError && !isDependencyChanged) {
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

  if (hint) {
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
