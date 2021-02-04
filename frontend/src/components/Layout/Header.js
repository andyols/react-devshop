import { Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { ColorModeButton, NavButton } from 'components/Shared/Buttons'
import { NavMenu } from 'components/Shared/Menus'
import { FiShoppingCart, FiTerminal } from 'react-icons/fi'

const Header = () => {
  const headerBg = useColorModeValue('red.400', 'gray.700')

  return (
    <Flex
      as='header'
      justify='space-between'
      align='center'
      px='5%'
      py={3}
      boxShadow='base'
      color={'gray.50'}
      direction={['column', 'row']}
      bg={headerBg}
    >
      <NavButton
        label='dev-shop'
        leftIcon={<FiTerminal />}
        to='/'
        iconSpacing={0}
        size='lg'
      />

      <HStack spacing={6}>
        <NavButton label='Cart' rightIcon={<FiShoppingCart />} to='/cart' />
        <NavMenu />
        <ColorModeButton alignSelf='flex-end' />
      </HStack>
    </Flex>
  )
}

export default Header
