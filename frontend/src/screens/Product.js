import {
  Box,
  Divider,
  FormControl,
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
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { requestProduct } from 'api'
import {
  Alert,
  GoBackButton,
  PrimaryButton,
  PrimaryHeading,
  ProductRating
} from 'components/Shared'
import { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from 'slices/cartSlice'

const Product = ({ match, history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const toast = useToast()
  const id = match.params.id
  const { data: product, isSuccess, isFetchedAfterMount, isError } = useQuery(
    ['product', id],
    () => requestProduct(id),
    { enabled: !!id }
  )

  const [qty, setQty] = useState(1)
  const [inCart, setInCart] = useState(false)

  const loadStatus = isSuccess && isFetchedAfterMount
  const inStock = product?.stockCount > 0
  const inStockColor = useColorModeValue('green.600', 'green.300')
  const outOfStockColor = useColorModeValue('red.600', 'red.300')

  const handleAddToCart = () => {
    toast.closeAll()
    dispatch(addItem({ ...product, qty }))
    const title = qty > 1 ? `${qty} items added to cart` : 'Item added to cart'
    toast({
      title,
      description: `${product.name || ''}`,
      status: 'success'
    })
  }

  useEffect(() => {
    const found = cart.find((item) => item._id === id)
    if (found) {
      setInCart(true)
      setQty(found.qty)
    }
  }, [cart, id])

  return (
    <Stack>
      <Box>
        <GoBackButton to='/' />
      </Box>
      {isError ? (
        <Alert
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
              borderRadius='md'
              ignoreFallback
            />
          </Skeleton>
          {/* Product Overview */}
          <Skeleton isLoaded={loadStatus}>
            <Stack spacing={3}>
              <PrimaryHeading text={product?.name} />
              <Divider />
              <ProductRating
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
                    {inCart
                      ? `In Cart (${qty})`
                      : inStock
                      ? 'In Stock'
                      : 'Out of Stock'}
                  </StatHelpText>
                </Stat>
                {inStock && (
                  <FormControl>
                    <Select
                      value={qty}
                      disabled={inCart}
                      onChange={(e) => setQty(Number(e.target.value))}
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
                label={inCart ? 'Go to Cart' : 'Add to Cart'}
                colorScheme={inCart && 'green'}
                disabled={!inStock}
                onClick={inCart ? () => history.push('/cart') : handleAddToCart}
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
