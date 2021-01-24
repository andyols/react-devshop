import {
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  HStack,
  Image,
  Select,
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
import { requestProduct } from 'api'
import { CustomAlert, PrimaryButton, Rating } from 'components/Shared'
import { useState } from 'react'
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { Link as RouterLink } from 'react-router-dom'

const Product = ({ history, match }) => {
  const id = match.params.id
  const { data: product, isSuccess, isFetchedAfterMount, isError } = useQuery(
    ['product', id],
    () => requestProduct(id),
    { enabled: !!id }
  )

  const [qty, setQty] = useState(1)

  const loadStatus = isSuccess && isFetchedAfterMount
  const inStock = product?.stockCount > 0
  const inStockColor = useColorModeValue('green.600', 'green.300')
  const outOfStockColor = useColorModeValue('red.600', 'red.300')

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }

  return (
    <Stack>
      <Box>
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
              ignoreFallback
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
            <Stack d='block' spacing={5} boxShadow='base' p={3}>
              <HStack spacing={12}>
                <Stat>
                  <StatLabel>Total Price</StatLabel>
                  <StatNumber>${product?.price}</StatNumber>
                  <StatHelpText
                    color={inStock ? inStockColor : outOfStockColor}
                  >
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </StatHelpText>
                </Stat>
                {inStock && (
                  <FormControl>
                    <Select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product?.stockCount).keys()].map((o) => (
                        <option key={o + 1} value={o + 1}>
                          {o + 1}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </HStack>
              <Divider />
              <PrimaryButton
                label='Add to Cart'
                disabled={!inStock}
                onClick={handleAddToCart}
                rightIcon={<FiShoppingCart />}
                mt={3}
                w='100%'
              />
            </Stack>
          </Skeleton>
        </SimpleGrid>
      )}
    </Stack>
  )
}

export default Product
