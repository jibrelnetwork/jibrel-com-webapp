import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import {
  Field,
  FieldProps,
  FieldRenderProps,
} from 'react-final-form'

import settings from 'app/settings'

import style from './style.scss'
import { $CheckoutFrames } from '../../model'

import {
  CheckoutFrames,
  CheckoutEventHandlers,
  CheckoutTokenizedEvent,
  CheckoutValidationEvent,
} from '../../model/types/checkout'

const CheckoutNamespace = 'Frames'

declare global {
  interface Window {
    [CheckoutNamespace]: CheckoutFrames & CheckoutEventHandlers;
  }
}

type CheckoutCardInputFieldProps = FieldProps<string, FieldRenderProps<string>>

interface CheckoutCardInputProps extends FieldRenderProps<string> {
  frames: CheckoutFrames;
}

interface CheckoutCardInputFrameProps {
  name: string;
  label: string;
  className?: string;
}

const CheckoutCardFakeInput: React.FunctionComponent<CheckoutCardInputProps> = ({
  input,
  frames,
}) => {
  useEffect(() => {
    frames.addEventHandler<CheckoutValidationEvent>(
      frames.Events.CARD_VALIDATION_CHANGED,
      ({ isValid }) => {
        if (isValid) {
          frames.submitCard()
        } else {
          frames.enableSubmitForm()
          input.onChange(null)
        }
      },
    )

    frames.addEventHandler<CheckoutTokenizedEvent>(
      frames.Events.CARD_TOKENIZED,
      ({ token }) => {
        input.onChange(token)
      },
    )

    return (): void => {
      frames.removeAllEventHandlers(frames.Events.CARD_TOKENIZED)
      frames.removeAllEventHandlers(frames.Events.CARD_VALIDATION_CHANGED)
    }
  })

  return null
}

const validate = (frames: CheckoutFrames) => (value?: string): void | string => {
  if (!(value && frames)) {
    return 'required'
  } else if (!frames.isCardValid()) {
    return 'invalid card'
  }
}

const CheckoutCardInputFrame: React.FunctionComponent<CheckoutCardInputFrameProps> = ({
  name,
  label,
  className,
}) => {
  return (
    <div className={`${style.frame} ${className}`}>
      <div
        id={name}
        className={`frame ${name}`}
      />
      <label
        htmlFor={className}
        className={style.label}
      >
        {label}
      </label>
    </div>
  )
}

const CheckoutCardInputField: React.FunctionComponent<CheckoutCardInputFieldProps> = ({ name }) => {
  const frames = useStore($CheckoutFrames)

  if (!frames) {
    return null
  }

  useEffect(() => {
    frames.init({
      publicKey: settings.CHECKOUT_PUBLIC_KEY,
      style: {
        base: {
          color: '#081e39',
          fontSize: '18px',
          lineHeight: '25px',
          padding: '29px 16px 10px 16px',
          transition: 'padding 0.2s ease 0s',
        },
        focus: {
          padding: '19px 16px 20px 16px',
        },
        invalid: {
          color: '#DC3632',
        },
        placeholder: {
          base: {
            color: '#9ca5b0',
          },
        },
        'card-number': {
          minWidth: '360px',
        },
      },
    })
  }, [])

  return (
    <div className={style.main}>
      <CheckoutCardInputFrame
        label='Card Number'
        name='card-number-frame'
      />
      <div className={style.bottom}>
        <CheckoutCardInputFrame
          label='Expiry date'
          className={style.date}
          name='expiry-date-frame'
        />
        <CheckoutCardInputFrame
          label='Security Code'
          className={style.cvv}
          name='cvv-frame'
        />
      </div>
      {frames && (
        <Field
          frames={frames}
          validate={validate(frames)}
          component={CheckoutCardFakeInput}
          name={name}
        />
      )}
    </div>
  )
}

export default CheckoutCardInputField
