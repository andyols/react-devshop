import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react'
import { FiChevronDown, FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logoutRequest } from 'slices/authSlice'
import { NavButton } from '../Buttons'

const AdminMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const menuColor = useColorModeValue('gray.900', 'gray.50')
  const menuExpandedColor = useColorModeValue('gray.200', 'gray.400')
  const auth = useSelector((state) => state.auth)

  if (!auth.user.token)
    return <NavButton label='Sign In' rightIcon={<FiLogIn />} to='/login' />

  return auth.loading ? (
    <Spinner size='xs' />
  ) : (
    <Menu isLazy>
      <MenuButton
        as={Button}
        variant='link'
        rightIcon={<FiChevronDown />}
        color='gray.50'
        _expanded={{ color: menuExpandedColor, textDecor: 'underline' }}
        _focus={{ outline: 0, textDecor: 'underline' }}
      >
        {auth.user.name.split(' ')[0]}
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem
            color={menuColor}
            onClick={() => history.push('/admin/users')}
          >
            Users
          </MenuItem>
          <MenuItem
            color={menuColor}
            onClick={() => history.push('/admin/orders')}
          >
            Orders
          </MenuItem>
          <MenuItem
            color={menuColor}
            onClick={() => history.push('/admin/products')}
          >
            Products
          </MenuItem>
          <MenuItem color={menuColor} onClick={() => dispatch(logoutRequest())}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default AdminMenu
