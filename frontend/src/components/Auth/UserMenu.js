import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react'
import { NavButton } from 'components/Shared'
import { useRef, useState } from 'react'
import { FiChevronDown, FiLogIn, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { logoutRequest } from 'slices/authSlice'
import { emptyCart } from 'slices/cartSlice'

const UserMenu = () => {
  const auth = useSelector((state) => state.auth)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const menuColor = useColorModeValue('gray.900', 'gray.50')
  const menuExpandedColor = useColorModeValue('gray.200', 'gray.400')

  const [logoutAlert, setLogoutAlert] = useState(false)
  const cancelRef = useRef()

  const handleCloseAlert = () => setLogoutAlert(false)

  const handleConfirmLogout = () => {
    dispatch(emptyCart())
    dispatch(logoutRequest())

    setLogoutAlert(false)

    if (location.pathname.includes('cart')) history.push('/')
  }

  const LogoutAlert = () => (
    <AlertDialog
      isOpen={logoutAlert}
      onClose={handleCloseAlert}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Signing Out</AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to sign out? Any outstanding cart items will
            be removed.
          </AlertDialogBody>

          <AlertDialogFooter>
            <HStack spacing={3}>
              <Button ref={cancelRef} onClick={handleCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleConfirmLogout}>
                Sign Out
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  if (!auth.user.token)
    return <NavButton label='Sign In' icon={<FiLogIn />} to='/login' />

  return auth.loading ? (
    <Spinner size='xs' />
  ) : (
    <>
      <LogoutAlert />
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
          <MenuItem color={menuColor} onClick={() => setLogoutAlert(true)}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default UserMenu
