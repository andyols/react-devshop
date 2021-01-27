import {
  Box,
  Heading,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ProductRating } from '..'

const ProductCard = ({ product, loaded }) => {
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
      <Skeleton isLoaded={loaded}>
        <Image
          src={product.image}
          alt={product.name}
          borderTopRadius='md'
          fallbackSrc='https://via.placeholder.com/500'
        />
      </Skeleton>
      <Box p={3}>
        <Wrap justify='space-between'>
          <WrapItem>
            <Skeleton isLoaded={loaded}>
              <Heading
                size='sm'
                fontWeight='semibold'
                as='h3'
                href={`/product/${product._id}`}
              >
                {product.name}
              </Heading>
            </Skeleton>
          </WrapItem>

          <WrapItem>
            <Skeleton isLoaded={loaded}>
              <ProductRating
                value={product.rating}
                text={`${product.reviewCount} reviews`}
              />
            </Skeleton>
          </WrapItem>

          <WrapItem>
            <Skeleton isLoaded={loaded}>
              <Text fontSize='lg' fontWeight='bold'>
                ${product.price}
              </Text>
            </Skeleton>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  )
}

export default ProductCard
