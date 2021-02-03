import {
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ProductRating } from '.'

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
      <Image
        src={product.image}
        alt={product.name}
        borderTopRadius='md'
        fallbackSrc='https://via.placeholder.com/500'
      />
      <Box p={3}>
        <Wrap justify='space-between'>
          <WrapItem>
            <Heading
              size='sm'
              fontWeight='semibold'
              as='h3'
              href={`/product/${product._id}`}
            >
              {product.name}
            </Heading>
          </WrapItem>

          <WrapItem>
            <ProductRating
              value={product.rating}
              text={`${product.reviewCount} reviews`}
            />
          </WrapItem>

          <WrapItem>
            <Text fontSize='lg' fontWeight='bold'>
              ${product.price}
            </Text>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  )
}

export default ProductCard
