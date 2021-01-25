import {
  Box,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ProductRating } from '..'

const ProductCard = ({ product, loadStatus }) => {
  return (
    <Skeleton
      isLoaded={loadStatus}
      as={RouterLink}
      to={`/product/${product._id}`}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='md'
      _hover={{ boxShadow: 'md' }}
      boxShadow='base'
      transition='ease-in-out 150ms'
    >
      <Image
        src={product.image}
        alt={product.name}
        borderTopRadius='md'
        ignoreFallback
      />

      <Box p={3}>
        <Stack>
          <Heading
            size='sm'
            fontWeight='semibold'
            href={`/product/${product._id}`}
          >
            {product.name}
          </Heading>

          <ProductRating
            value={product.rating}
            text={`${product.reviewCount} reviews`}
          />

          <Text fontSize='lg' fontWeight='bold'>
            ${product.price}
          </Text>
        </Stack>
      </Box>
    </Skeleton>
  )
}

export default ProductCard
