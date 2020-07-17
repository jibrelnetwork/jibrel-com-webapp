import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import style from './style.scss'
import grid from '../Grid/grid.scss'

export interface FooterProps {
  cmsURL: string;
  languageCode: string;
}

const Footer: React.FunctionComponent<FooterProps> = ({
  cmsURL,
  languageCode,
}) => {
  const i18n = useI18n()

  return (
    <div className={grid.centered}>
      <footer className={`${style.footer} footer`}>
        <div className="footer__company">
          <a
            id='t_footerMenuLogo'
            href={`${cmsURL}/${languageCode}`} className="footer__logo-link"
          >
            <img className="footer__logo" src={`${cmsURL}/img/ic_logo_mono_32.svg`} />
          </a>
          <div className="footer__copyright">
            &copy; {(new Date()).getFullYear()} Jibrel Limited
          </div>
        </div>
        <nav className="footer__navigation">
          <section className="footer__navigation-section">
            <h2 className="footer__navigation-section-title">Jibrel</h2>
            <ul className="footer__navigation-list">
              <li className="footer__navigation-item">
                <a
                  
                  id='t_footerMenuInvest'
                  href={`${cmsURL}/${languageCode}/invest`} className="footer__navigation-link">
                  {i18n._('navigation.invest')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_footerMenuRaise'
                  href={`${cmsURL}/${languageCode}/raise`}
                  className="footer__navigation-link"
                >
                  {i18n._('navigation.raise')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_footerMenuAbout'
                  href={`${cmsURL}/${languageCode}/about`}
                  className="footer__navigation-link"
                >
                  {i18n._('navigation.about')}
                </a>
              </li>
            </ul>
          </section>
          <section className="footer__navigation-section">
            <h2 className="footer__navigation-section-title">
              {i18n._('navigation.legal')}
            </h2>
            <ul className="footer__navigation-list">
              <li className="footer__navigation-item">
                <a
                  id='t_footerMenuRisk'
                  href={`${cmsURL}/docs/en/risk-disclosures.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__navigation-link"
                >
                  {i18n._('navigation.risks')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_footerMenuTerms'
                  href={`${cmsURL}/docs/en/terms-and-conditions.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__navigation-link"
                >
                  {i18n._('navigation.terms')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_footerMenuPrivacy'
                  href={`${cmsURL}/docs/en/privacy-policy.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__navigation-link"
                >
                  {i18n._('navigation.privacy')}
                </a>
              </li>
            </ul>
          </section>
          <section className="footer__navigation-section">
            <h2 className="footer__navigation-section-title">
              {i18n._('navigation.help')}
            </h2>
            <ul className="footer__navigation-list">
              <li className="footer__navigation-item">
                <a
                  id='t_footerMenuSupport'
                  href="mailto:support@jibrel.network"
                  className="footer__navigation-link"
                >
                  {i18n._('navigation.support')}
                </a>
              </li>
            </ul>
          </section>
          <section className="footer__navigation-section">
            <h2 className="footer__navigation-section-title">
              {i18n._('navigation.social')}
            </h2>
            <ul className="footer__navigation-list">
              <li className="footer__navigation-item">
                <a
                  id='t_twitter'
                  href="https://twitter.com/JibrelNetwork" target="_blank" rel="noopener noreferrer"
                  className="footer__navigation-link"
                >
                  <svg className="footer__navigation-item-icon" width='24' height='24' viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M23.954 4.56909C23.069 4.95809 22.124 5.22309 21.129 5.34409C22.143 4.73309 22.923 3.77009 23.292 2.62109C22.341 3.17609 21.287 3.58009 20.165 3.80509C19.269 2.84609 17.992 2.24609 16.574 2.24609C13.857 2.24609 11.654 4.44909 11.654 7.16309C11.654 7.55309 11.699 7.92809 11.781 8.28709C7.691 8.09409 4.066 6.13009 1.64 3.16109C1.213 3.88309 0.974 4.72209 0.974 5.63609C0.974 7.34609 1.844 8.84909 3.162 9.73209C2.355 9.70609 1.596 9.48409 0.934 9.11609V9.17709C0.934 11.5621 2.627 13.5511 4.88 14.0041C4.467 14.1151 4.031 14.1751 3.584 14.1751C3.27 14.1751 2.969 14.1451 2.668 14.0891C3.299 16.0421 5.113 17.4661 7.272 17.5061C5.592 18.8251 3.463 19.6111 1.17 19.6111C0.78 19.6111 0.391 19.5881 0 19.5441C2.189 20.9381 4.768 21.7531 7.557 21.7531C16.611 21.7531 21.556 14.2571 21.556 7.76709C21.556 7.55809 21.556 7.34709 21.541 7.13709C22.502 6.44809 23.341 5.57709 24.001 4.58909L23.954 4.56909Z'/>
                  </svg>
                  {i18n._('navigation.twitter')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_facebook'
                  href="https://www.facebook.com/jibrelnetwork/" target="_blank" rel="noopener noreferrer"
                  className="footer__navigation-link">
                  <svg className="footer__navigation-item-icon" width='24' height='24' viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z'/>
                  </svg>
                  {i18n._('navigation.facebook')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_medium'
                  href="https://medium.com/@jibrelnetwork" target="_blank" rel="noopener noreferrer"
                  className="footer__navigation-link">
                  <svg className="footer__navigation-item-icon" width='24' height='24' viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M0 0V24H24V0H0ZM19.938 5.686L18.651 6.92C18.5964 6.96155 18.5542 7.01725 18.529 7.08106C18.5038 7.14487 18.4965 7.21436 18.508 7.282V16.349C18.4967 16.4165 18.5041 16.4858 18.5293 16.5494C18.5545 16.613 18.5966 16.6685 18.651 16.71L19.908 17.944V18.215H13.586V17.945L14.888 16.68C15.016 16.552 15.016 16.515 15.016 16.32V8.99L11.396 18.185H10.906L6.69 8.99V15.153C6.67266 15.2808 6.68462 15.4109 6.72499 15.5334C6.76536 15.6559 6.83307 15.7676 6.923 15.86L8.617 17.914V18.185H3.815V17.915L5.51 15.86C5.5992 15.7675 5.6654 15.6553 5.70327 15.5325C5.74114 15.4097 5.74961 15.2797 5.728 15.153V8.027C5.73798 7.92938 5.7248 7.83079 5.68953 7.73922C5.65426 7.64765 5.59789 7.56569 5.525 7.5L4.019 5.686V5.416H8.693L12.306 13.339L15.482 5.415H19.938V5.686Z'/>
                  </svg>
                  {i18n._('navigation.medium')}
                </a>
              </li>
              <li className="footer__navigation-item">
                <a
                  id='t_linkedin'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__navigation-link"
                  href="https://www.linkedin.com/company/jibrel-network/"
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    className="footer__navigation-item-icon"
                  >
                    <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"/>
                  </svg>
                  {i18n._('navigation.linkedin')}
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </footer>
    </div>
  )
}

export default Footer
