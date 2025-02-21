import arrow from '../../assets/shop/icons/arrow-right.svg'
import { NavLink, useLocation } from 'react-router'
import { path } from '../../routers'

export default function BreadCrumb() {
  const location = useLocation()

  return (
    <div className='breadcrumb'>
      <div className='back-home'>
        <NavLink to={path.home}>Home </NavLink>
      </div>
      <img src={arrow} alt='' />
      <p>{location.pathname.split('/')[1]}</p>
    </div>
  )
}
