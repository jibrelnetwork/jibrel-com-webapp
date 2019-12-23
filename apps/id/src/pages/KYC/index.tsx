import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { BigButton } from '@jibrelcom/ui'
import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import KYCLayout from 'layouts/KYCLayout'

import style from './style.scss'
import { KYCType } from './types'

import { Button } from './components'
import settings from 'app/settings'
import { useLanguageCode } from 'app/i18n'

interface KYCProps {
  goTo: (name: string, params?: object) => void;
}

const KYC: React.FunctionComponent<KYCProps> = ({
  goTo,
}) => {
  const languageCode = useLanguageCode()
  const [kycType, setKYCType] = useState(KYCType.empty)

  return (
    <KYCLayout>
      <div className={`${grid.grid} ${style.choice}`}>
        <h2 className={`${style.title} ${grid.column}`}>What type of investor are you?</h2>
        <div className={`${style.button} ${grid.column}`}>
          <Button
            setKYCType={setKYCType}
            type={KYCType.individual}
            iconName='human'
            description='Use an individual account if you want to invest on behalf of yourself.'
            isActive={kycType === KYCType.individual}
          />
        </div>
        <div className={`${style.button} ${grid.column}`}>
          <Button
            setKYCType={setKYCType}
            type={KYCType.organizational}
            iconName='case'
            description='Use an organizational account if you will invest on behalf of an accredited organization.'
            isActive={kycType === KYCType.organizational}
          />
        </div>
        {kycType !== KYCType.empty && (
          <div className={`${style.info} ${style.column}`}>
            <h3 className={style.title}>Required Data</h3>
            <div className={style.infoContent}>
              <p>
                In order to complete the verification process, you will need to provide:
              </p>
              {kycType === KYCType.individual && (
                <ul>
                  <li>personal information,</li>
                  <li>contact information,</li>
                  <li>ID document (passport),</li>
                  <li>proof of address (utility bill or bank statement),</li>
                  <li>a declaration of source of funds.</li>
                </ul>
              )}
              {kycType === KYCType.organizational && (
                <ul>
                  <li>company information,</li>
                  <li>primary contact information,</li>
                  <li>Ultimate Beneficial Owner (UBO) information,</li>
                  <li>commercial register,</li>
                  <li>shareholder register,</li>
                  <li>articles of Incorporation.</li>
                </ul>
              )}
              <p>
                If you have any questions, please contact our <a
                  href='mailto:support@jibrel.com'
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Support Team
                </a>.
              </p>
            </div>
          </div>
        )}
      </div>
      {kycType !== KYCType.empty && (
        <div className={`${grid.grid} ${style.actions}`}>
          <div className={`${style.button} ${grid.column}`}>
            <BigButton
              onClick={(): void => goTo((kycType === KYCType.individual)
                ? 'KYCIndividual'
                : 'KYCCompany',
              )}
              variant={BigButtonVariant.main}
              className={style.action}
            >
              Start
            </BigButton>
          </div>
          <div className={`${style.button} ${grid.column}`}>
            <BigButton
              onClick={(): void => {
                window.location.href = `${settings.HOST_CMS}/${languageCode}`
              }}
              variant={BigButtonVariant.secondary}
              className={style.action}
            >
              Back to Main
            </BigButton>
          </div>
        </div>
      )}
    </KYCLayout>
  )
}

export default connect(
  null,
  {
    goTo: (name: string, params?: object) => actions.navigateTo(name, params),
  },
)(KYC)
