import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
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
import { FiChevronDown, FiLogIn, FiLogOut } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { logoutRequest } from 'slices/authSlice'

const UserMenu = () => {
  const cancelRef = useRef()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const menuColor = useColorModeValue('gray.900', 'gray.50')
  const menuExpandedColor = useColorModeValue('gray.200', 'gray.400')
  const auth = useSelector((state) => state.auth)
  const cartLength = useSelector((state) => state.cart.items.length)
  const cartEmpty = cartLength === 0
  const [logoutAlert, setLogoutAlert] = useState(false)

  const handleCloseAlert = () => setLogoutAlert(false)

  const handleConfirmLogout = () => {
    dispatch(logoutRequest())
    setLogoutAlert(false)
  }

  const LogoutAlert = () =>
    cartEmpty ? null : (
      <AlertDialog
        isOpen={logoutAlert}
        onClose={handleCloseAlert}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader pb={0}>Before you go...</AlertDialogHeader>

            <Divider mt={3} mb={1} />

            {cartLength === 1 ? (
              <AlertDialogBody>
                You still have an item in your cart!
              </AlertDialogBody>
            ) : (
              <AlertDialogBody>
                You still have {cartLength} items in your cart!
              </AlertDialogBody>
            )}

            <AlertDialogBody>
              Signing out will remove any items in your cart and checkout
              information of unfinished orders.
            </AlertDialogBody>

            <AlertDialogBody>
              Are you sure you want to sign out?
            </AlertDialogBody>

            <Divider my={1} />

            <AlertDialogFooter d='flex' justifyContent='space-between'>
              <Button ref={cancelRef} onClick={handleCloseAlert}>
                Cancel
              </Button>
              {location.pathname.includes('product') ? (
                <Button
                  colorScheme='purple'
                  onClick={handleConfirmLogout}
                  rightIcon={<FiLogOut />}
                >
                  Sure am!
                </Button>
              ) : (
                <Button
                  as={RouterLink}
                  to='/'
                  colorScheme='purple'
                  onClick={handleConfirmLogout}
                  rightIcon={<FiLogOut />}
                >
                  Sure am!
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )

  if (!auth.user.token)
    return <NavButton label='Sign In' rightIcon={<FiLogIn />} to='/login' />

  return auth.loading ? (
    <Spinner size='xs' />
  ) : (
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
            <MenuItem
              color={menuColor}
              onClick={() =>
                cartEmpty ? dispatch(logoutRequest()) : setLogoutAlert(true)
              }
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
}

export default UserMenu
