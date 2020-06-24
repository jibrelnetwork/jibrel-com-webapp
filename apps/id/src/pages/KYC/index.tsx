import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { BigButtonVariant } from '@jibrelcom/ui/src/BigButton/types'

import {
  Grid,
  BigButton,
} from '@jibrelcom/ui'

import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

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
  const i18n = useI18n()
  const languageCode = useLanguageCode()
  const [kycType, setKYCType] = useState(KYCType.empty)

  return (
    <KYCLayout>
      <Grid.Container className={style.choice}>
        <Grid.Item className={style.title} component='h2'>
          {i18n._('KYC.Index.chooseType.title')}
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
            type={KYCType.individual}
            description={i18n._('KYC.Index.chooseType.individual')}
            iconName='human'
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
            description={i18n._('KYC.Index.chooseType.institution')}
            iconName='case'
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
            <h2 className={style.title}>
              {i18n._('KYC.Index.requiredData.title')}
            </h2>
            <div className={style.content}>
              <p>
                {i18n._('KYC.Index.requiredData.description')}
              </p>
              {kycType === KYCType.individual && (
                <ul>
                  <li>{i18n._('KYC.Index.requiredData.individual.personal')}</li>
                  <li>{i18n._('KYC.Index.requiredData.individual.contact')}</li>
                  <li>{i18n._('KYC.Index.requiredData.individual.id')}</li>
                  <li>{i18n._('KYC.Index.requiredData.individual.proofOfAddress')}</li>
                  <li>{i18n._('KYC.Index.requiredData.individual.sourceOfFunds')}</li>
                </ul>
              )}
              {kycType === KYCType.institution && (
                <ul>
                  <li>{i18n._('KYC.Index.requiredData.institution.company')}</li>
                  <li>{i18n._('KYC.Index.requiredData.institution.contact')}</li>
                  <li>{i18n._('KYC.Index.requiredData.institution.ubo')}</li>
                  <li>{i18n._('KYC.Index.requiredData.institution.commercial')}</li>
                  <li>{i18n._('KYC.Index.requiredData.institution.shareholder')}</li>
                  <li>{i18n._('KYC.Index.requiredData.institution.articles')}</li>
                </ul>
              )}
              <p
                className={style.support}
                dangerouslySetInnerHTML={{
                  __html: i18n._('KYC.Index.requiredData.support'),
                }}
              />
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
              id='t_startButton'
            >
              {i18n._('KYC.Index.action.start')}
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
              component='a'
              href={`${settings.CMS_ORIGIN}/${languageCode}`}
              variant={BigButtonVariant.secondary}
              className={style.action}
              id='t_backtoMainButton'
            >
              {i18n._('KYC.Index.action.back')}
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
