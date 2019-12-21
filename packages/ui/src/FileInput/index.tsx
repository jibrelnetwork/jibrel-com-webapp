import React, { useEffect } from 'react'
import cc from 'classcat'

import Icon from '../Icon'
import style from './style.scss'
import inputStyle from '../Input/style.scss'
import MessageWrapper from '../FieldWrapper/MessageWrapper'
import { MessageType } from '../FieldWrapper/types'

import {
  withField,
  withFieldUX,
} from '../FieldWrapper'

export interface FileInputProps {
  onFileChange: (file: File | void) => void;
  label: string;
  error?: string;
  message?: string;
  fileName?: string;
  className?: string;
  placeholder?: string;
  messageType?: MessageType;
  fileSize?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const KILO = 1024

const getMessage = ({
  error,
  message,
  fileName,
  messageType,
  isLoading,
}: FileInputProps): {
  message: string | undefined;
  messageType: MessageType | undefined;
} => {
  if (message && messageType) {
    return {
      message,
      messageType,
    }
  }

  if (isLoading) {
    return {
      message: 'Uploading...',
      messageType: MessageType.info,
    }
  }

  if (error) {
    return {
      message: error,
      messageType: MessageType.error,
    }
  }

  if (fileName) {
    return {
      message: 'Uploaded',
      messageType: MessageType.success,
    }
  }

  return {
    message: undefined,
    messageType: undefined,
  }
}

const getFileSize = (bytes: number): string => {
  const kBytes = (bytes / KILO)

  return (kBytes < KILO)
    ? `${kBytes.toFixed(1)} KB`
    : `${(kBytes / KILO).toFixed(1)} MB`
}

const FileInput: React.FunctionComponent<FileInputProps> = (props) => {
  const {
    onFileChange,
    error,
    label,
    fileSize,
    fileName,
    className,
    placeholder,
    onChange,
    value,
    id,
    isLoading = false,
    isDisabled = false,
    ...otherProps
  } = props

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()

    if (fileName) {
      onFileChange(undefined)
    }

    e.stopPropagation()
  }

  const handleChange = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement
    const file: File | void = target.files ? target.files[0] : undefined

    onFileChange(file)
  }

  // Fixme: Preserve raw "value" prop
  useEffect(() => onChange(id), [id])

  return (
      <MessageWrapper {...getMessage(props)}>
        <label
          className={cc([
            style.input,
            inputStyle.input,
            error && style.error,
            fileName && style.active,
            isLoading && style.loading,
            className,
          ])}
        >
          <input
            {...otherProps}
            onChange={handleChange}
            className={style.field}
            type='file'
            accept='image/png,image/jpg,image/jpeg,.pdf'
            disabled={isDisabled || isLoading}
          />
          <div className={style.name}>{fileName}</div>
          <div className={style.placeholder}>{fileName ? '' : placeholder}</div>
          <div className={style.size}>{fileSize ? getFileSize(fileSize) : 'Max size 10 MB' }</div>
          <div className={inputStyle.frame} />
          <div className={style.border} />
          <p
            className={cc([
              style.label,
              inputStyle.label,
            ])}
          >
            {label}
          </p>
          <button
            onClick={handleClick}
            className={style.button}
            type='button'
          >
            <Icon
              className={style.icon}
              name={`ic_${fileName ? 'close' : 'add'}_24`}
            />
          </button>
        </label>
      </MessageWrapper>
  )
}

export default withField(withFieldUX(FileInput))
