import { useSelector } from 'react-redux'
import AdminMenu from './AdminMenu'
import UserMenu from './UserMenu'

const MenuSwitch = () => {
  const isAdmin = useSelector((state) => state.auth.user.isAdmin)
  return isAdmin ? <AdminMenu /> : <UserMenu />
}

export default MenuSwitch
