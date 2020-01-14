import React, { Component } from 'react'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Icon,
  Link,
  Input,
  Checkbox,
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

interface KYCData {
  name: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postCode: string;
  country: string;
}

interface OfferData {
  id: string;
  name: string;
  deadline: string;
  roundSize: string;
  valuation: string;
  fundingRound: string;
  offeredEquity: string;
  pricePerShare: string;
  typeOfSecurity: string;
  minimumInvestment: string;
}

interface InvestState {
  kycData: KYCData | void;
  offerData: OfferData | void;
}

async function getKYCData(id: string): Promise<KYCData | void> {
  if (!id) {
    return Promise.resolve(undefined)
  }

  return Promise.resolve({
    name: 'Talal Tabbaa',
    streetAddress: 'Abu Dhabi Global Market Authorities Building',
    apartment: 'ADGM Square',
    city: 'Al Maryah Island',
    postCode: 'PO Box 111999',
    country: 'Abu Dhabi, UAE',
  })
}

async function getOfferData(id: string): Promise<OfferData | void> {
  if (!id) {
    return Promise.resolve(undefined)
  }

  return Promise.resolve({
    id: 'startupId',
    name: 'Startup Name',
    offeredEquity: '20%',
    pricePerShare: '$30',
    roundSize: '$400,000',
    valuation: '$2,000,000',
    fundingRound: 'Seed Round',
    minimumInvestment: '$1,000',
    deadline: 'November 1st, 2019',
    typeOfSecurity: 'Common Shares',
  })
}

const InvestForm = ({ handleSubmit }: FormRenderProps): React.ReactNode => {
  const i18n = useI18n()

  return (
    <form onSubmit={handleSubmit}>
      <InvestmentInput />
      <Input
        validate={isRequired({ i18n })}
        label=''
        name='amount'
        maxLength={256}
      />
      <Checkbox
        validate={isRequired({ i18n })}
        name='isAmountCorrect'
      >
        I confirm that the entered amount is correct
      </Checkbox>
      <Checkbox
        validate={isRequired({ i18n })}
        name='isTermsAgreed'
      >
        I agree to <a href='#'>Jibrel’s Terms and Conditions</a>
      </Checkbox>
      <div>Download subscription agreement</div>
      <div>By clicking Accept and Sign, I understand and agree that this is a legal representation of my handwritten signature/initials.</div>
      <BigButtonSubmit>
        Accept and Sign
      </BigButtonSubmit>
    </form>
  )
}

class Invest extends Component<InvestProps, InvestState> {
  constructor(props: InvestProps) {
    super(props)

    this.state = {
      kycData: undefined,
      offerData: undefined,
    }
  }

  async componentDidMount(): Promise<void> {
    const { slug }: InvestProps = this.props

    this.setState({
      kycData: await getKYCData(slug),
      offerData: await getOfferData(slug),
    })
  }

  render(): React.ReactNode {
    const { slug }: InvestProps = this.props
    const startupName: string = STARTUP_NAMES[slug]

    return (
      <CoreLayout>
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
        <DealTerms />
        <div>To continue, you need to sign the Subscription Agreement by electronic signature. Before you do this, please enter your Subscription Amount</div>
        <CustomerData />
        <Form
          onSubmit={console.log}
          render={InvestForm}
        />
      </CoreLayout>
    )
  }
}

export default Invest
