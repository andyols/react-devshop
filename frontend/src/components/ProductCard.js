import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Rating } from './Shared'

const ProductCard = ({ product }) => {
  return (
    <Box
      as={RouterLink}
      to={`/product/${product._id}`}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='md'
      _hover={{ boxShadow: 'md' }}
      boxShadow='base'
      transition='ease-in-out 150ms'
    >
      <Image src={product.image} alt={product.name} borderTopRadius='md' />
      <Box p={3}>
        <Stack>
          <Heading
            size='sm'
            fontWeight='semibold'
            href={`/product/${product._id}`}
          >
            {product.name}
          </Heading>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />

          <Text fontSize='lg' fontWeight='bold'>
            ${product.price}
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default ProductCard
