import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { ColorModeButton, NavButton } from 'components/Shared'
import { FiChevronDown, FiLogIn, FiShoppingBag } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from 'slices/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = user.token
  const headerBg = useColorModeValue('red.400', 'gray.700')
  const menuColor = useColorModeValue('gray.900', 'gray.50')
  const menuExpandedColor = useColorModeValue('gray.200', 'gray.400')

  return (
    <Flex
      as='header'
      justify='space-between'
      align='center'
      px='5%'
      py={3}
      mb={3}
      boxShadow='base'
      color={'gray.50'}
      direction={['column', 'row']}
      bg={headerBg}
    >
      <Text
        as={RouterLink}
        to='/'
        fontWeight='semibold'
        fontSize='xl'
        _focus={{ outline: 0, textDecor: 'underline' }}
      >
        {'>dev-shop'}
      </Text>
      <HStack spacing={7}>
        <NavButton label='Cart' icon={<FiShoppingBag />} to='/cart' />
        {isAuthenticated ? (
          <Menu isLazy placement='bottom'>
            <MenuButton
              as={Button}
              variant='link'
              rightIcon={<FiChevronDown />}
              color='gray.50'
              _expanded={{ color: menuExpandedColor }}
              _focus={{ outline: 0, textDecor: 'underline' }}
            >
              {user.name}
            </MenuButton>
            <MenuList>
              <MenuItem color={menuColor}>My Profile</MenuItem>
              <MenuItem color={menuColor} onClick={() => dispatch(logout())}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <NavButton label='Sign In' icon={<FiLogIn />} to='/login' />
        )}
        <ColorModeButton alignSelf='flex-end' />
      </HStack>
    </Flex>
  )
}

export default Header
