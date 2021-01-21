import { Flex, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { FiLogIn, FiShoppingBag } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

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
        <HStack as={RouterLink} to='/login'>
          <Text>Sign In</Text>
          <Icon as={FiLogIn} />
        </HStack>
        <HStack as={RouterLink} to='/cart'>
          <Text>Cart</Text>
          <Icon as={FiShoppingBag} />
        </HStack>
        <ColorModeSwitcher alignSelf='flex-end' />
      </HStack>
    </Flex>
  )
}

export default Header
