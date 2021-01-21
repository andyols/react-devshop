import {
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { FiLogIn, FiShoppingBag } from 'react-icons/fi'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const Header = () => {
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
      bg={useColorModeValue('red.400', 'gray.700')}
    >
      <Text as={Link} fontWeight='semibold' fontSize='xl'>
        {'>dev-shop'}
      </Text>
      <HStack spacing={7}>
        <Link as={HStack}>
          <Text>Sign In</Text>
          <Icon as={FiLogIn} />
        </Link>
        <Link as={HStack}>
          <Text>Cart</Text>
          <Icon as={FiShoppingBag} />
        </Link>
        <ColorModeSwitcher alignSelf='flex-end' />
      </HStack>
    </Flex>
  )
}

export default Header
