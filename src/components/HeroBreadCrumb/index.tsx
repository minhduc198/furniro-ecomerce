import logo from '../../assets/common/logo-funiro.svg'
import BreadCrumb from '../BreadCrumb'

interface Props {
  page: string
}
export default function HeroBreadCrumb({ page }: Props) {
  return (
    <div className='bread-crumb-hero'>
      <div className='logo-bread-crumb'>
        <img src={logo} alt='' />
      </div>
      <div className='bread-crumb-title'>{page}</div>
      <BreadCrumb />
    </div>
  )
}
