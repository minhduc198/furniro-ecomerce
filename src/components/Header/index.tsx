import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useLocation } from 'react-router'
import shoppingCartIcon from '../../assets/header/icons/buy.svg'
import favoriteIcon from '../../assets/header/icons/favourite.svg'
import userIcon from '../../assets/header/icons/icon-profile.svg'
import logoFull from '../../assets/header/icons/logo-full.svg'
import searchIcon from '../../assets/header/icons/search.svg'
import { CART_TYPE } from '../../constants'
import useCart from '../../hooks/useCart'
import useFavorite from '../../hooks/useFavorite'
import { path } from '../../routers'
import CartProduct from '../CartProduct'
import { CustomNavLink } from '../CustomNavLink'

export default function Header() {
  const { cartState, setCartType } = useCart()
  const { favoriteState } = useFavorite()
  const cartItemCount = cartState.items.length
  const favoriteCount = favoriteState.items.length
  const [openMenu, setOpenMenu] = useState(false)
  const location = useLocation()

  const { openCart, setOpenCart } = useCart()
  const toggleMenu = () => setOpenMenu((prev) => !prev)

  const closeCart = () => setOpenCart(false)

  const handleOpenCart = (type: CART_TYPE) => {
    setCartType(type)
    setOpenCart(true)
  }

  useEffect(() => {
    if (location.pathname) {
      setOpenMenu(false)
    }

    window.scrollTo(0, 0)
  }, [location.pathname])

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
            <CustomNavLink linkName='Shop' path={path.product} />
            <CustomNavLink linkName='About' path={path.about} />
            <CustomNavLink linkName='Contact' path={path.contact} />
          </div>
          <div className='header-action'>
            <div className='img-header-action'>
              <img className='cursor-pointer' src={userIcon} alt='' />
            </div>
            <div className='img-header-action'>
              <img className='cursor-pointer' src={searchIcon} alt='' />
            </div>
            <div className='relative img-header-action' onClick={() => handleOpenCart(CART_TYPE.FAVORITE)}>
              <img className='cursor-pointer' src={favoriteIcon} alt='' />
              {!!favoriteCount && <div className='badge'>{favoriteCount > 9 ? '9+' : favoriteCount}</div>}
            </div>
            <div className='relative img-header-action' onClick={() => handleOpenCart(CART_TYPE.SHOPPING)}>
              <img className='cursor-pointer' src={shoppingCartIcon} alt='' />
              {!!cartItemCount && <div className='badge'>{cartItemCount > 9 ? '9+' : cartItemCount}</div>}
            </div>
          </div>
        </div>
      </div>
      {openMenu && <div className='header-overlay' onClick={toggleMenu}></div>}
      {openCart && (
        <>
          <div className='header-overlay' onClick={closeCart}></div>
          <CartProduct onClose={closeCart} />
        </>
      )}
    </React.Fragment>
  )
}
