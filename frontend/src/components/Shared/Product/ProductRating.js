import { HStack, Icon, Text } from '@chakra-ui/react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({ value, text }) => {
  const empty = FaRegStar
  const half = FaStarHalfAlt
  const full = FaStar
  return (
    <HStack spacing={0} color='yellow.400'>
      <Icon as={value >= 1 ? full : value >= 0.5 ? half : empty} />
      <Icon as={value >= 2 ? full : value >= 1.5 ? half : empty} />
      <Icon as={value >= 3 ? full : value >= 2.5 ? half : empty} />
      <Icon as={value >= 4 ? full : value >= 3.5 ? half : empty} />
      <Icon as={value >= 5 ? full : value >= 4.5 ? half : empty} />
      <Text fontSize='sm' color='gray.500' pl={2}>
        {text && text}
      </Text>
    </HStack>
  )
}

export default Rating
