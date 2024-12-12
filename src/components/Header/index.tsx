import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import shoppingCartIcon from '../../assets/header/icons/buy.svg'
import favoriteIcon from '../../assets/header/icons/favourite.svg'
import userIcon from '../../assets/header/icons/icon-profile.svg'
import logoFull from '../../assets/header/icons/logo-full.svg'
import searchIcon from '../../assets/header/icons/search.svg'
import { CustomNavLink } from '../CustomNavLink'
import { path } from '../../routers'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => setOpenMenu(!openMenu)

  return (
    <React.Fragment>
      <div className='header'>
        <div>
          <img src={logoFull} alt='' />
        </div>
        {!openMenu && (
          <div className='hamburger-menu cursor-pointer' onClick={toggleMenu}>
            <RxHamburgerMenu size={25} />
          </div>
        )}
        <div className={`header-content ${openMenu ? 'header-content-active' : ''}`}>
          <div className='menu'>
            <div className='header-mobile'>
              <div>
                <img src={logoFull} alt='' />
              </div>
              {openMenu && (
                <div className='hamburger-menu cursor-pointer' onClick={toggleMenu}>
                  <IoCloseOutline size={35} />
                </div>
              )}
            </div>
            <CustomNavLink linkName='Home' path={path.home} />
            <CustomNavLink linkName='Shop' path={path.shop} />
            <CustomNavLink linkName='About' path={path.about} />
            <CustomNavLink linkName='Contact' path={path.contact} />
          </div>
          <div className='header-action'>
            <div>
              <img className='cursor-pointer' src={userIcon} alt='' />
            </div>
            <div>
              <img className='cursor-pointer' src={searchIcon} alt='' />
            </div>
            <div>
              <img className='cursor-pointer' src={favoriteIcon} alt='' />
            </div>
            <div>
              <img className='cursor-pointer' src={shoppingCartIcon} alt='' />
            </div>
          </div>
        </div>
      </div>
      {openMenu && <div className='header-overlay' onClick={toggleMenu}></div>}
    </React.Fragment>
  )
}
