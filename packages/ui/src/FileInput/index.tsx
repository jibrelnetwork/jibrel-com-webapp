import React, { useState } from 'react'
import cc from 'classcat'

import Icon from '../Icon'
import style from './style.scss'
import inputStyle from '../Input/style.scss'
import { withMessage } from '../FieldWrapper'

import { withFieldUX } from '../FieldWrapper'
import { Field } from 'react-final-form'

export interface FileInputProps {
  onUpload: (file: File) => Promise<string>;
  onSetUploadError: (err: string | undefined) => void;
  onSetUploadProgress: (isLoading: boolean) => void;
  accept?: string;
  label: string;
  hasError?: boolean;
  message?: string;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
  value: string;
  onChange: (id: string | void) => void;
}

type FileLike = File | {
  name: string;
  size: number;
}

const KILO = 1024

const getFileSize = (bytes: number): string => {
  const kBytes = (bytes / KILO)

  return (kBytes < KILO)
    ? `${kBytes.toFixed(1)} KB`
    : `${(kBytes / KILO).toFixed(1)} MB`
}

// FIXME: add types
const withFileField = (
  FileInputComponent,
) => {
  const WithFileFieldWrapper = (props) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    // FIXME: should translate messages
    return (
      <Field
        {...props}
        component={FileInputComponent}
        onSetUploadError={setError}
        onSetUploadProgress={setIsLoading}
        error={error}
        progress={isLoading ? 'Uploading...' : undefined}
      />
    )
  }

  return WithFileFieldWrapper
}

const FileInput: React.FunctionComponent<FileInputProps> = ({
  onUpload,
  onSetUploadError,
  onSetUploadProgress,
  accept = 'image/png,image/jpg,image/jpeg,.pdf',
  hasError = false,
  label,
  className,
  placeholder,
  isDisabled = false,
  value,
  onChange,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<FileLike | void>(
    value
      ? { name: value, size: 0 }
      : undefined
  )

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()

    if (value) {
      onChange(undefined)
    }

    e.stopPropagation()
  }

  const handleChange = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement
    const file: File | void = target.files ? target.files[0] : undefined

    if (file) {
      setFile(file)
      onSetUploadError(undefined)
      onChange(undefined)
      setIsLoading(true)
      onSetUploadProgress(true)
      onUpload(file)
        .then((id) => {
          onChange(id)
          setIsLoading(false)
          onSetUploadProgress(false)
        })
        .catch((err) => {
          onSetUploadError(err.message)
          onChange(undefined)
          setIsLoading(false)
          onSetUploadProgress(false)
        })
    }
  }

  return (
    <label
      className={cc([
        style.input,
        inputStyle.wrapper,
        hasError && style.error,
        file && style.active,
        isLoading && style.loading,
        className,
      ])}
    >
      <input
        {...props}
        onChange={handleChange}
        className={style.field}
        type='file'
        accept={accept}
        disabled={isDisabled || isLoading}
        key={value}
      />
      <div className={style.name}>{value && file && file.name}</div>
      <div className={style.placeholder}>{value ? '' : placeholder}</div>
      <div className={style.size}>{(value && file && file.size) ? getFileSize(file.size) : 'Max size 10 MB' }</div>
      <div className={inputStyle.border} />
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
          name={`ic_${value ? 'close' : 'add'}_24`}
        />
      </button>
    </label>
  )
}

export default withFileField(withFieldUX(withMessage(FileInput)))
