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
import { FiCheck, FiShoppingCart } from 'react-icons/fi'
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
    if (inCart) {
      toast({
        title: 'Item already in cart',
        description: `${product.name || ''}`,
        status: 'error',
        position: 'bottom-left'
      })
    } else {
      dispatch(addItem({ ...product, qty }))
      toast({
        title: 'Item added to cart',
        description: `${product.name || ''}`,
        status: 'success',
        position: 'bottom-left'
      })
      history.push('/cart')
    }
  }

  useEffect(() => {
    if (!!cart.find((item) => item._id === id)) {
      setInCart(true)
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
              borderRadius='base'
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
                    {}
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </StatHelpText>
                </Stat>
                {inStock && (
                  <FormControl>
                    <Select
                      value={qty}
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
                label={inCart ? 'Item in cart' : 'Add to Cart'}
                colorScheme={inCart && 'green'}
                disabled={!inStock || inCart}
                onClick={handleAddToCart}
                rightIcon={inCart ? <FiCheck /> : <FiShoppingCart />}
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
