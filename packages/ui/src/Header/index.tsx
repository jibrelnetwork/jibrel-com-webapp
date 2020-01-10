import React, { useState } from 'react'
import cc from 'classcat'

import style from './style.scss'
import grid from '../theme/grid.scss'

export interface HeaderProps {
  logout?: () => void;
  cmsURL: string;
  className?: string;
  languageCode: string;
  isAuthenticated?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  cmsURL,
  languageCode,
  logout = undefined,
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
        ])}
        data-is-open={isMenuOpen ? '1' : '0'}
      >
        <div className='navbar__wrapper common__centered'>
          <nav className='navbar__content'>
            <a href={`${cmsURL}/${languageCode}`} className="navbar__logo-link">
              <img className="navbar__logo navbar__logo--black" src={`${cmsURL}/img/ic_logo_colored_32.svg`} />
              <img className="navbar__logo navbar__logo--white" src={`${cmsURL}/img/ic_logo_colored_32_white.svg`} />
            </a>
            <button
              className="navbar__menu-toggle"
              onClick={handleClickButton}
            >
              Open menu
            </button>
            <div className="navbar__menu">
              <ul className="navbar__menu-list">
                <li className="navbar__menu-item">
                  <a href="mailto:support@jibrel.com" className="navbar__menu-link">Support</a>
                </li>
                {isAuthenticated && logout && (
                  <li className="navbar__menu-item">
                    <a
                      href="#"
                      className="navbar__menu-link"
                      onClick={logout}
                    >Log out</a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
