import { Flex, Link, Text } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const Header = () => {
  return (
    <Flex
      as='header'
      justify='space-between'
      align='center'
      px={5}
      py={3}
      boxShadow='base'
    >
      <Text as={Link} fontWeight='semibold' fontSize='xl'>
        {'>dev-shop'}
      </Text>
      <ColorModeSwitcher alignSelf='flex-end' />
    </Flex>
  )
}

export default Header
