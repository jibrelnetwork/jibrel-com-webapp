import React, { useState } from 'react'
import cc from 'classcat'
import { useI18n } from '@jibrelcom/i18n'

import style from './style.scss'
import grid from '../Grid/grid.scss'

export interface HeaderProps {
  logout: () => void;
  lang: string;
  domain: string;
  className?: string;
  activeRoute?: string;
  isAuthenticated?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  logout,
  lang,
  domain,
  activeRoute,
  isAuthenticated = false,
}) => {
  const i18n = useI18n()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClickButton = (): void => {
    const nextIsMenuOpen = !isMenuOpen
    document.body.setAttribute('data-scroll', nextIsMenuOpen ? '0' : '1')
    setIsMenuOpen(nextIsMenuOpen)
  }

  return (
    <header className={style.header}>
      <div
        className={cc([
          'navbar',
          '--black',
          grid.centered,
          !isAuthenticated && '--no-dropdown',
        ])}
        data-is-open={isMenuOpen ? '1' : '0'}
      >
        <div className={cc(['navbar__wrapper', 'common__centered', style.wrapper])}>
          <nav className='navbar__content'>
            <a
            id='t_headerMenuLogo'
            href={`//${domain}/${lang}`} className="navbar__logo-link"
            >
              <img
                className="navbar__logo navbar__logo--black"
                src={`//${domain}/img/ic_logo_colored_32.svg`}
              />
              <img
                className="navbar__logo navbar__logo--white"
                src={`//${domain}/img/ic_logo_colored_32_white.svg`}
              />
            </a>
            <button
              className="navbar__menu-toggle"
              onClick={handleClickButton}
            >
              {i18n._('navigation.menuToggle')}
            </button>
            <div className="navbar__menu">
              {isAuthenticated ? (
                <>
                  <ul className="navbar__menu-list">
                    <li className="navbar__menu-item">
                      <a
                        id='t_headerMenuInvest'
                        href={`//${domain}/${lang}/invest`}
                        className="navbar__menu-link"
                      >
                        {i18n._('navigation.invest')}
                      </a>
                    </li>
                    <li className="navbar__menu-item">
                      <a
                        id='t_headerMenuRaise'
                        href={`//${domain}/${lang}/raise`}
                        className="navbar__menu-link"
                      >
                        {i18n._('navigation.raise')}
                      </a>
                    </li>
                    <li className="navbar__menu-item">
                      <a
                        id='t_headerMenuAbout'
                        href={`//${domain}/${lang}/about`}
                        className="navbar__menu-link"
                      >
                        {i18n._('navigation.about')}
                      </a>
                    </li>
                    <li className="navbar__menu-item">
                      <a
                        id='t_headerMenuPortfolio'
                        href={`//investor.${domain}`}
                        className={cc([
                          'navbar__menu-link',
                          (activeRoute === 'Portfolio') && '--current',
                        ])}
                      >
                        {i18n._('navigation.portfolio')}
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar__menu-list">
                    <li className="navbar__menu-item">
                      <a
                        id='t_headerMenuLogout'
                        href="#"
                        className="navbar__menu-link"
                        onClick={logout}
                      >
                        {i18n._('navigation.logout')}
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                <ul className="navbar__menu-list">
                  <li className="navbar__menu-item">
                    <a
                      id='t_headerMenuSupport'
                      href="mailto:support@jibrel.com"
                      className="navbar__menu-link"
                    >
                      {i18n._('navigation.support')}
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
