import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import {
  BigButton,
  BigButtonVariant,
  Grid,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import { CompanyData } from 'store/types/portfolio'

import style from './style.scss'

export interface CompaniesProps {
  list: CompanyData[];
}

const MAX_COMPANIES_COUNT = 3

const Company: React.FunctionComponent<CompanyData> = ({
  logo,
  color,
  title,
  preview,
  tagline,
  location,
  permalink,
  currentOffering,
}) => {
  const i18n = useI18n()

  return (
    <li className='companies__list-item common__grid__item --xs-4 --s-8 --m-4 --l-4'>
      <a
        style={{ backgroundImage: `url(${preview})` }}
        href={`${settings.HOST_CMS}${permalink}`}
        className='company-card --with-stats'
      >
        <div
          style={{
            backgroundImage:
              `linear-gradient(180deg, rgba(32, 34, 43, 0) 45.66%, ${color.primary} 100%)`,
          }}
          className='company-card__contents'
        >
          <div
            className='company-card__logo'
            style={{ backgroundColor: color.primary }}
          >
            <img
              src={logo}
              alt={`${title} Logo`}
              className='company-card__logo-img'
            />
          </div>
          <h3 className='company-card__title'>{title}</h3>
          {currentOffering && (
            <>
              {currentOffering.flags.completed && (
                <div className='company-card__status --completed'>
                  {i18n._('Portfolio.offering.status.completed')}
                </div>
              )}
              {currentOffering.flags.waitlist && (
                <div className='company-card__status --waitlist'>
                  {i18n._('Portfolio.offering.status.waitlist')}
                </div>
              )}
              <div className='company-card__tagline'>{tagline}</div>
              <div className='company-card__location'>{location}</div>
              {currentOffering.flags.waitlist && (
                <div className='company-card__stats'>
                  <p className='company-card__stats-note'>
                    {i18n._('Portfolio.offering.waitlist.notice')}
                  </p>
                </div>
              )}
              {currentOffering.flags.active && (
                <>
                  <ul className='company-card__stats'>
                    <li className='company-card__stat'>
                      <h4 className='company-card__stat-title'>
                        {i18n._('Portfolio.offering.goal.title')}
                      </h4>
                      <p className='company-card__stat-value'>
                        {currentOffering.goal_formatted}
                      </p>
                    </li>
                    {currentOffering.valuation && (
                      <li className='company-card__stat'>
                        <h4 className='company-card__stat-title'>
                          {currentOffering.valuation_title}
                        </h4>
                        <p className='company-card__stat-value'>
                          {currentOffering.valuation_formatted}
                        </p>
                      </li>
                    )}
                    <li className='company-card__stat'>
                      <h4 className='company-card__stat-title'>
                        {i18n._('Portfolio.offering.round.title')}
                      </h4>
                      <p className='company-card__stat-value'>
                        {currentOffering.round_formatted}
                      </p>
                    </li>
                  </ul>
                  {currentOffering.flags.completed && (
                    <ul className='company-card__stats'>
                      <li className='company-card__stat --completed'>
                        <h4 className='company-card__stat-title'>
                          {i18n._('Portfolio.offering.completed.goal.title')}
                        </h4>
                        <p className='company-card__stat-value'>
                          {currentOffering.goal_formatted}
                        </p>
                      </li>
                      {currentOffering.valuation && (
                        <li className='company-card__stat'>
                          <h4 className='company-card__stat-title'>
                            {currentOffering.valuation_title}
                          </h4>
                          <p className='company-card__stat-value'>
                            {currentOffering.valuation_formatted}
                          </p>
                        </li>
                      )}
                      <li className='company-card__stat'>
                        <h4 className='company-card__stat-title'>
                          {i18n._('Portfolio.offering.round.title')}
                        </h4>
                        <p className='company-card__stat-value'>
                          {currentOffering.round_formatted}
                        </p>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </a>
    </li>
  )
}

const Companies: React.FunctionComponent<CompaniesProps> = ({ list }) => {
  const i18n = useI18n()
  const hasMore = (list.length > MAX_COMPANIES_COUNT)

  return (
    <>
      <link
        href={`${settings.HOST_CMS}/styles/common.css`}
        type='text/css'
        rel='stylesheet'
      />
      <ul className={`${style.main} companies__list common__grid`}>
        {list.slice(0, MAX_COMPANIES_COUNT).map(c => (<Company key={c.slug} {...c} />))}
      </ul>
      {hasMore && (
        <Grid.Item
          xs={4}
          s={4}
          m={4}
          l={4}
          xl={4}
          className={style.button}
        >
          <BigButton
            href={settings.HOST_CMS}
            variant={BigButtonVariant.secondary}
            component='a'
          >
            {i18n._('Portfolio.offering.action.more')}
          </BigButton>
        </Grid.Item>
      )}
    </>
  )
}

export default Companies
