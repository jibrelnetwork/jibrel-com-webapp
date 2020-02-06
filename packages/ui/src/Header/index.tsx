import React, { useState } from 'react'
import cc from 'classcat'

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
          style.main,
          !isAuthenticated && '--no-dropdown',
        ])}
        data-is-open={isMenuOpen ? '1' : '0'}
      >
        <div className='navbar__wrapper common__centered'>
          <nav className='navbar__content'>
            <a href={`//${domain}/${lang}`} className="navbar__logo-link">
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
              Open menu
            </button>
            <div className="navbar__menu">
              {isAuthenticated ? (
                <>
                  <ul className="navbar__menu-list">
                    <li className="navbar__menu-item">
                      <a
                        href={`//${domain}/${lang}/invest`}
                        className="navbar__menu-link"
                      >
                        Invest
                      </a>
                    </li>
                    <li className="navbar__menu-item">
                      <a
                        href={`//${domain}/${lang}/raise`}
                        className="navbar__menu-link"
                      >
                        Raise
                      </a>
                    </li>
                    <li className="navbar__menu-item">
                      <a
                        href={`//${domain}/${lang}/about`}
                        className="navbar__menu-link"
                      >
                        About
                      </a>
                    </li>
                    <li className="navbar__menu-item">
                      <a
                        href={`//investor.${domain}/portfolio`}
                        className={cc([
                          'navbar__menu-link',
                          (activeRoute === 'Portfolio') && '--current',
                        ])}
                      >
                        Portfolio
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar__menu-list">
                    <li className="navbar__menu-item">
                      <a
                        href="#"
                        className="navbar__menu-link"
                        onClick={logout}
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                <ul className="navbar__menu-list">
                  <li className="navbar__menu-item">
                    <a
                      href="mailto:support@jibrel.com"
                      className="navbar__menu-link"
                    >
                      Support
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
