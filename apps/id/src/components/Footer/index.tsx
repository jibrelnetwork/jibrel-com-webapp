import React from 'react'
import { LogoColor } from '@jibrelcom/ui/src/Logo/types'

import {
  Icon,
  Logo,
} from '@jibrelcom/ui'

import style from './style.scss'

interface FooterSocialLink {
  url: string;
  label: string;
}

const FooterSocialLink: React.FunctionComponent<FooterSocialLink> = ({
  url,
  label,
}) => (
  <a href={url} className={style.social}>
    <Icon name={`ic_${label}_14`} className={style.icon} />
    {label}
  </a>
)

const Footer: React.FunctionComponent = () => (
  <div
    className={style.footer}
  >
    <div className={style.main}>
      <div>
        <a href='/'>
          <Logo color={LogoColor.gray} />
        </a>
        <div className={style.copy}>© 2019 Jibrel Limited</div>
      </div>
      <div className={style.links}>
        <div className={style.group}>
          <div className={style.title}>Jibrel</div>
          <a href='#'>Invest</a>
          <a href='#'>Raise</a>
          <a href='#'>About</a>
        </div>
        <div className={style.group}>
          <div className={style.title}>Legal</div>
          <a href='#'>Privacy Policy</a>
          <a href='#'>Risk Disclosures</a>
          <a href='#'>AML &amp; COMPLIANCE</a>
          <a href='#'>Terms &amp; conditions</a>
        </div>
        <div className={style.group}>
          <div className={style.title}>Help</div>
          <a href='#'>Support</a>
        </div>
        <div className={style.group}>
          <div className={style.title}>Social</div>
          <FooterSocialLink url='#' label='twitter' />
          <FooterSocialLink url='#' label='facebook' />
          <FooterSocialLink url='#' label='medium' />
          <FooterSocialLink url='#' label='telegram' />
          <FooterSocialLink url='#' label='kakaotalk' />
        </div>
      </div>
    </div>
  </div>
)

export default Footer
