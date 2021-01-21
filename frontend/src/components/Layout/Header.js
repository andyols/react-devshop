import { Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { FiLogIn, FiShoppingBag } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { ColorModeSwitch, NavButton } from '../Shared'

const Header = () => {
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
      bg={useColorModeValue('red.400', 'gray.700')}
    >
      <Text as={RouterLink} to='/' fontWeight='semibold' fontSize='xl'>
        {'>dev-shop'}
      </Text>
      <HStack spacing={7}>
        <NavButton label='Sign In' icon={<FiLogIn />} to='/login' />
        <NavButton label='Cart' icon={<FiShoppingBag />} to='/cart' />
        <ColorModeSwitch alignSelf='flex-end' />
      </HStack>
    </Flex>
  )
}

export default Header
