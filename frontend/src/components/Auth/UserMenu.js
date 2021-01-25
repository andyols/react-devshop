import { NavButton } from 'components/Shared'
import { FiChevronDown, FiLogIn, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logoutRequest } from 'slices/authSlice'

const {
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  Button,
  Spinner,
  MenuItem
} = require('@chakra-ui/react')

const UserMenu = () => {
  const auth = useSelector((state) => state.auth)
  const history = useHistory()
  const dispatch = useDispatch()
  const menuColor = useColorModeValue('gray.900', 'gray.50')
  const menuExpandedColor = useColorModeValue('gray.200', 'gray.400')

  if (!auth.user.token)
    return <NavButton label='Sign In' icon={<FiLogIn />} to='/login' />

  return auth.loading ? (
    <Spinner size='xs' />
  ) : (
    <Menu isLazy placement='bottom'>
      <MenuButton
        as={Button}
        variant='link'
        leftIcon={<FiUser />}
        rightIcon={<FiChevronDown />}
        color='gray.50'
        _expanded={{ color: menuExpandedColor }}
        _focus={{ outline: 0, textDecor: 'underline' }}
      >
        {auth?.user?.name?.split(' ')[0]}
      </MenuButton>
      <MenuList>
        <MenuItem color={menuColor} onClick={() => history.push('/profile')}>
          My Profile
        </MenuItem>
        <MenuItem color={menuColor} onClick={() => dispatch(logoutRequest())}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
