import { Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { UserMenu } from 'components/Auth'
import { ColorModeButton, NavButton } from 'components/Shared'
import { FiShoppingBag } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  const headerBg = useColorModeValue('red.400', 'gray.700')

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
        <UserMenu />
        <ColorModeButton alignSelf='flex-end' />
      </HStack>
    </Flex>
  )
}

export default Header
