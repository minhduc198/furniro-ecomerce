import { NavLink } from 'react-router'

interface Props {
  linkName: string
  path: string
}

export const CustomNavLink = ({ linkName, path }: Props) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <div className={`menu-item font-500 cursor-pointer ${isActive ? 'menu-item-active' : ''}`}>{linkName}</div>
      )}
    </NavLink>
  )
}
