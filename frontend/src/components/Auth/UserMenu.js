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
  Portal,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react'
import { NavButton } from 'components/Shared'
import { useRef, useState } from 'react'
import { FiChevronDown, FiLogIn } from 'react-icons/fi'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { logoutRequest } from 'slices/authSlice'
import { emptyCart } from 'slices/cartSlice'

const UserMenu = () => {
  const cancelRef = useRef()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const menuColor = useColorModeValue('gray.900', 'gray.50')
  const menuExpandedColor = useColorModeValue('gray.200', 'gray.400')
  const auth = useSelector((state) => state.auth)
  const loaded = !auth.loading
  const [logoutAlert, setLogoutAlert] = useState(false)

  const handleCloseAlert = () => setLogoutAlert(false)

  const handleConfirmLogout = () => {
    dispatch(emptyCart())
    dispatch(logoutRequest())
    queryClient.removeQueries('profile')
    setLogoutAlert(false)
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
              {location.pathname.includes('product') ? (
                <Button colorScheme='red' onClick={handleConfirmLogout}>
                  Sign Out
                </Button>
              ) : (
                <Button
                  as={RouterLink}
                  to='/'
                  colorScheme='red'
                  onClick={handleConfirmLogout}
                >
                  Sign Out
                </Button>
              )}
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  if (!auth.user.token)
    return <NavButton label='Sign In' rightIcon={<FiLogIn />} to='/login' />

  return loaded ? (
    <>
      <LogoutAlert />
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
              onClick={() => history.push('/profile')}
            >
              My Profile
            </MenuItem>
            <MenuItem color={menuColor} onClick={() => setLogoutAlert(true)}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  ) : (
    <Spinner size='xs' />
  )
}

export default UserMenu
