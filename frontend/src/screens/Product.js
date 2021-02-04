import {
  Divider,
  FormControl,
  HStack,
  Image,
  Select,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { requestProduct } from 'api'
import { EqualColumns } from 'components/Layout'
import { PrimaryButton } from 'components/Shared/Buttons'
import { Alert } from 'components/Shared/Feedback'
import { ProductRating } from 'components/Shared/Product'
import { PrimaryHeading } from 'components/Shared/Typography'
import { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { cartAction } from 'slices/cartSlice'

const Product = ({ match, history }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const id = match.params.id
  const { data: product, isLoading, isError } = useQuery(
    ['product', id],
    () => requestProduct(id),
    { enabled: !!id }
  )

  const [qty, setQty] = useState(1)
  const [inCart, setInCart] = useState(false)

  const loaded = !isLoading
  const inStock = product?.stockCount > 0
  const inStockColor = useColorModeValue('green.600', 'green.300')
  const outOfStockColor = useColorModeValue('red.600', 'red.300')

  const handleAddToCart = () => dispatch(cartAction({ ...product, qty }))

  useEffect(() => {
    const found = cart.items.find(item => item._id === id)
    if (found) {
      setInCart(true)
      setQty(found.qty)
    } else {
      setInCart(false)
      setQty(1)
    }
  }, [cart, id])

  return (
    <Stack>
      {isError ? (
        <Alert
          status='error'
          title='Oops!'
          description='It looks like something went wrong with the server'
        />
      ) : (
        !isLoading && (
          <EqualColumns>
            {/* Product Image */}
            <Image
              src={product?.image}
              alt={product?.name}
              borderRadius='md'
              ignoreFallback
            />
            {/* Product Overview */}
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
            {/* Product Purchase Information */}
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
                      onChange={e => setQty(Number(e.target.value))}
                    >
                      {[...Array(product?.stockCount).keys()].map(o => (
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
                loading={!loaded}
                colorScheme={inCart && 'green'}
                disabled={!inStock || !loaded}
                onClick={inCart ? () => history.push('/cart') : handleAddToCart}
                rightIcon={<FiShoppingCart />}
                mt={3}
                w='100%'
              />
            </Stack>
          </EqualColumns>
        )
      )}
    </Stack>
  )
}

export default withRouter(Product)
