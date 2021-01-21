import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='md'
      boxShadow='base'
    >
      <Image src={product.image} alt={product.name} borderTopRadius='md' />
      <Box p={3}>
        <Stack>
          <Heading
            size='sm'
            fontWeight='semibold'
            as={Link}
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

export default Product
