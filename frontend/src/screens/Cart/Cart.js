import {
  Divider,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import axios from 'axios'
import { CustomAlert, QuantitySelect } from 'components/Shared'
import { useEffect } from 'react'
import { FiTrash } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from 'slices/cartSlice'

const getProductById = async (id) => {
  const { data } = await axios({
    url: `/api/products/${id}`,
    method: 'GET'
  })
  return data
}

const Cart = ({ match, location }) => {
  const dispatch = useDispatch()
  const id = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const { data: product } = useQuery(
    ['product', id],
    () => getProductById(id),
    { enabled: !!id }
  )

  const cart = useSelector((state) => state.cart)

  const handleChange = (e) => console.log(e.target.value)

  useEffect(() => {
    if (product) {
      dispatch(
        addItem({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          stockCount: product.stockCount,
          qty
        })
      )
    }
  }, [product])

  return (
    <Grid templateColumns='repeat(12, 1fr)' gap={4}>
      <GridItem colSpan={[12, 12, 8]}>
        <Heading as='h1' size='lg' mb={3}>
          Shopping Cart
        </Heading>
        {cart.length === 0 ? (
          <CustomAlert
            status='info'
            description='Your cart is empty. Click to go back.'
            to='/'
          />
        ) : (
          <Stack spacing={3}>
            {cart.map((product, i, arr) => (
              <>
                <Grid
                  templateColumns='repeat(12, 1fr)'
                  gap={6}
                  alignItems='center'
                >
                  <GridItem colSpan={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      boxSize='100px'
                      fit='contain'
                    />
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text fontWeight='semibold'>{product.name}</Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Text>${product.price}</Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <QuantitySelect {...{ product, qty, handleChange }} />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <IconButton
                      aria-label='Remove item from cart'
                      icon={<FiTrash />}
                      variant='ghost'
                      colorScheme='red'
                    />
                  </GridItem>
                </Grid>
                {i < arr.length - 1 && <Divider />}
              </>
            ))}
          </Stack>
        )}
      </GridItem>
      <GridItem colSpan={[12, 12, 2]}></GridItem>
      <GridItem colSpan={[12, 12, 2]}></GridItem>
    </Grid>
  )
}

export default Cart
