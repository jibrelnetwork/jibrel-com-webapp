import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { useLanguageCode } from '@jibrelcom/i18n'
import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import {
  Grid,
  BigButton,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import KYCLayout from 'layouts/KYCLayout'

import style from './style.scss'
import { KYCType } from './types'
import { Button } from './components'

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
      <Grid.Container className={style.choice}>
        <Grid.Item className={style.title} component='h2'>What type of investor are you?</Grid.Item>
        <Grid.Item
          className={style.button}
          xs={4}
          s={4}
          m={3}
          l={4}
        >
          <Button
            setKYCType={setKYCType}
            type={KYCType.individual}
            iconName='human'
            description='Use an individual account if you want to invest on your own behalf.'
            isActive={kycType === KYCType.individual}
          />
        </Grid.Item>
        <Grid.Item
          className={style.button}
          xs={4}
          s={4}
          m={3}
          l={4}
        >
          <Button
            setKYCType={setKYCType}
            type={KYCType.institution}
            iconName='case'
            description='Use a professional account if you will invest on behalf of an accredited organization.'
            isActive={kycType === KYCType.institution}
          />
        </Grid.Item>
        {kycType !== KYCType.empty && (
          <Grid.Item
            className={style.info}
            xs={4}
            s={8}
            m={5}
            l={5}
          >
            <h2 className={style.title}>Required Data</h2>
            <div className={style.content}>
              <p>
                In order to complete the verification process, you will need to provide:
              </p>
              {kycType === KYCType.individual && (
                <ul>
                  <li>personal information</li>
                  <li>contact information</li>
                  <li>ID document (passport)</li>
                  <li>proof of address (utility bill or bank statement)</li>
                  <li>a declaration of source of funds</li>
                </ul>
              )}
              {kycType === KYCType.institution && (
                <ul>
                  <li>company information</li>
                  <li>primary contact information</li>
                  <li>Ultimate Beneficial Owner (UBO) information</li>
                  <li>commercial register</li>
                  <li>shareholder register</li>
                  <li>articles of Incorporation</li>
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
          </Grid.Item>
        )}
      </Grid.Container>
      {kycType !== KYCType.empty && (
        <Grid.Container className={style.actions}>
          <Grid.Item
            className={style.button}
            xs={4}
            s={4}
            m={3}
            l={4}
          >
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
          </Grid.Item>
          <Grid.Item
            className={style.button}
            xs={4}
            s={4}
            m={3}
            l={4}
          >
            <BigButton
              href={`${settings.HOST_CMS}/${languageCode}`}
              variant={BigButtonVariant.secondary}
              className={style.action}
            >
              Back to Main
            </BigButton>
          </Grid.Item>
        </Grid.Container>
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
