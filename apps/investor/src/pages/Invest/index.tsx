import React, { Component } from 'react'
import { useI18n } from '@jibrelcom/i18n'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Icon,
  Link,
  Input,
  LinkButton,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import CoreLayout from 'layouts/CoreLayout'
import STARTUP_NAMES from 'data/startupNames.json'
import isRequired from 'utils/validators/isRequired'

import style from './style.scss'

import {
  DealTerms,
  CustomerData,
  InvestmentInput,
} from './components'

export interface InvestProps {
  slug: string;
}

const InvestForm = ({ handleSubmit }: FormRenderProps): React.ReactNode => {
  const i18n = useI18n()

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.form}>
        <InvestmentInput />
        <Input
          validate={isRequired({ i18n })}
          label=''
          name='amount'
          maxLength={256}
        />
      </div>
      <LinkButton
        onClick={console.log}
        className={style.download}
        type='button'
      >
        Download subscription agreement
      </LinkButton>
      <p className={style.agreement}>
        By clicking <span>
          Accept and Sign
        </span>, I understand and agree that this is a legal representation of my handwritten signature/initials.
      </p>
      <BigButtonSubmit className={style.submit}>
        Accept and Sign
      </BigButtonSubmit>
    </form>
  )
}

class Invest extends Component<InvestProps> {
  render(): React.ReactNode {
    const { slug }: InvestProps = this.props
    const startupName: string = STARTUP_NAMES[slug]

    return (
      <CoreLayout>
        <div className={grid.grid}>
          <div className={style.back}>
            <Icon
              className={style.icon}
              name='ic_arrow_right_24'
            />
            <Link href={`//jibrel.com/en/companies/${slug}`}>
              {`Back to ${startupName}`}
            </Link>
          </div>
          <h1 className={style.title}>{`Invest to ${startupName}`}</h1>
          <DealTerms slug={slug} />
          <div className={style.note}>
            To continue, you need to sign the Subscription Agreement by electronic signature. Before you do this, please enter your Subscription Amount
          </div>
          <CustomerData slug={slug} />
          <Form
            onSubmit={console.log}
            render={InvestForm}
          />
        </div>
      </CoreLayout>
    )
  }
}

export default Invest
