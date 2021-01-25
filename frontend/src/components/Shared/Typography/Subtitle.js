import { Text } from '@chakra-ui/react'
import React from 'react'

const Subtitle = ({ text, ...rest }) => {
  return (
    <Text color='gray.500' {...rest}>
      {text}
    </Text>
  )
}

export default Subtitle
