import { Icon, Text } from '@chakra-ui/react'
import React from 'react'

const Subtitle = ({ text, icon, ...rest }) => {
  return (
    <Text color='gray.500' {...rest}>
      {icon && <Icon as={icon} mb={1} mr={1} />} {text}
    </Text>
  )
}

export default Subtitle
