import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import axios from 'axios'
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { Link as RouterLink } from 'react-router-dom'
import { CustomAlert, Rating } from '../components/Shared'

const getProductById = async (id) => {
  const { data } = await axios({
    url: `/api/products/${id}`,
    method: 'GET'
  })
  return data
}

const Product = ({ match }) => {
  const id = match.params.id
  const { data: product, isSuccess, isFetchedAfterMount, isError } = useQuery(
    ['product', id],
    () => getProductById(id),
    { enabled: !!id }
  )

  const loadStatus = isSuccess && isFetchedAfterMount
  const inStock = product?.stockCount > 0
  const inStockColor = useColorModeValue('green.600', 'green.300')
  const outOfStockColor = useColorModeValue('red.600', 'red.300')
  const addToCartButtonColor = useColorModeValue('purple', 'cyan')

  return (
    <Stack>
      <Box pt={7}>
        <Button
          as={RouterLink}
          to='/'
          leftIcon={<FiArrowLeft />}
          variant='ghost'
        >
          Go Back
        </Button>
      </Box>
      {isError ? (
        <CustomAlert
          status='error'
          title='Oops!'
          description='It looks like something went wrong with the server'
        />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={12}>
          {/* Product Image */}
          <Skeleton isLoaded={loadStatus}>
            <Image
              src={product?.image}
              alt={product?.name}
              borderRadius='base'
              fallbackSrc='https://placehold.it/300'
            />
          </Skeleton>
          {/* Product Overview */}
          <Skeleton isLoaded={loadStatus}>
            <Stack spacing={3}>
              <Heading as='h1' size='lg'>
                {product?.name}
              </Heading>
              <Divider />
              <Rating
                value={product?.rating}
                text={`${product?.reviewCount} reviews`}
              />
              <Text fontWeight='semibold'>Price: ${product?.price}</Text>
              <Divider />
              <Text>{product?.description}</Text>
            </Stack>
          </Skeleton>
          {/* Product Purchase Information */}
          <Skeleton isLoaded={loadStatus}>
            <Stack d='block' spacing={5}>
              <Stat>
                <StatLabel>Total Price</StatLabel>
                <StatNumber>${product?.price}</StatNumber>
                <StatHelpText color={inStock ? inStockColor : outOfStockColor}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </StatHelpText>
              </Stat>
              <Divider />
              <Button
                mt={3}
                w='100%'
                colorScheme={addToCartButtonColor}
                rightIcon={<FiShoppingCart />}
                disabled={!inStock}
              >
                Add to Cart
              </Button>
            </Stack>
          </Skeleton>
        </SimpleGrid>
      )}
    </Stack>
  )
}

export default Product
