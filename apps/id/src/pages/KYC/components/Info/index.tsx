import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { BigButton } from '@jibrelcom/ui'
import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import style from './style.scss'
import { KYCType } from '../../types'

interface KYCInfoProps {
  goTo: (name: string, params?: object) => void;
  type: KYCType;
}

const REQUIRED_DATA = {
  [KYCType.individual]: [
    'personal information,',
    'contact information,',
    'ID document (passport),',
    'proof of address (utility bill or bank statement),',
    'a declaration of source of funds.',
  ],
  [KYCType.organizational]: [
    'company information,',
    'primary contact information,',
    'Ultimate Beneficial Owner (UBO) information,',
    'commercial register,',
    'shareholder register,',
    'articles of Incorporation.',
  ],
}

const Info: React.FunctionComponent<KYCInfoProps> = ({
  goTo,
  type,
}) => {
  if (type === KYCType.empty) {
    return null
  }

  return (
    <>
      <div className={style.text}>
        <div className={style.title}>Required Data</div>
        <p className={style.first}>
          In order to complete the verification process, you will need to provide:
        </p>
        <ul className={style.list}>
          {REQUIRED_DATA[type].map(item => (<li key={item}>{item}</li>))}
        </ul>
        <p>
          For more information on how Jibrel uses this information, please review our <a
            href='#'
          >
            Privacy Policy
          </a>.
        </p>
        <p>
          If you have any questions, please contact our <a
            href='#'
          >
            Support Team
          </a>.
        </p>
      </div>
      <div className={style.actions}>
        <BigButton
          onClick={(): void => goTo((type === KYCType.individual)
            ? 'KYC.Individual'
            : 'KYC.Company',
          )}
          className={style.action}
          variant={BigButtonVariant.main}
        >
          Start
        </BigButton>
        <BigButton
          onClick={(): void => goTo('Login', { lang: 'en' })}
          className={cc([style.action, style.back])}
          variant={BigButtonVariant.secondary}
        >
          Back to Main
        </BigButton>
      </div>
      {(type === KYCType.organizational) && (
        <div className={style.additional}>
          <p>
            In order to complete verification process you have to provide your company and contact information, list of beneficiaries and directors. Also you need to submit commercial and shareholder registers, as well as articles of incorporation. This form will take will take 10-20 minutes to fill in.   
          </p>
          <p>
            If you have any questions, please contact our <a
              href='#'
            >
              Support Team
            </a>.
          </p>
        </div>
      )}
    </>
  )
}

export default connect(
  null,
  {
    goTo: (name: string, params?: object) => actions.navigateTo(name, params),
  },
)(Info)
