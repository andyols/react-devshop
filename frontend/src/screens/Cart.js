import {
  Divider,
  FormControl,
  HStack,
  IconButton,
  Image,
  Select,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react'
import { ContentSidebar } from 'components/Layout'
import { PrimaryButton, PrimaryHeading, Subtitle } from 'components/Shared'
import { FiCreditCard, FiShoppingBag, FiTrash } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { cartAction } from 'slices/cartSlice'

const Cart = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const emptyCart = cart.items.length === 0

  const handleCheckout = () => {
    history.push('/login?redirect=checkout')
  }

  const Content = () => (
    <Stack spacing={3} divider={<Divider />} w='90%' mb={5}>
      <PrimaryHeading text='Shopping Cart' />
      {emptyCart && <Subtitle text='Your shopping cart is empty.' />}
      {cart.items.map((item) => (
        <SimpleGrid minChildWidth='25ch' gap={8} key={item._id}>
          {/* COL 1 */}
          <HStack spacing={3} maxW='35ch'>
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                boxSize='65px'
                fit='cover'
                borderRadius='md'
                boxShadow='base'
                ignoreFallback
              />
            )}
            <Text fontWeight='semibold' lineHeight='1.2rem'>
              {item.name}
            </Text>
          </HStack>
          {/* COL 2 */}
          <HStack spacing={6}>
            <FormControl>
              <Select
                value={item.qty}
                onChange={(e) =>
                  dispatch(cartAction({ ...item, qty: Number(e.target.value) }))
                }
              >
                {[...Array(item?.stockCount).keys()].map((o) => (
                  <option key={o + 1} value={o + 1}>
                    {o + 1}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Text>${item.price}</Text>
            <IconButton
              aria-label='Remove item from cart'
              icon={<FiTrash />}
              variant='ghost'
              colorScheme='red'
              onClick={() => dispatch(cartAction(item._id))}
            />
          </HStack>
        </SimpleGrid>
      ))}
    </Stack>
  )

  const Sidebar = () => (
    <Stack spacing={3} boxShadow='base' p={3} borderRadius='base' w='100%'>
      <Stat>
        <StatLabel>{'Subtotal'}</StatLabel>
        <StatNumber>
          $
          {cart.items
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </StatNumber>
        <StatHelpText>
          {emptyCart
            ? 'Cart is Empty'
            : cart.items.reduce((acc, item) => acc + item.qty, 0) === 1
            ? '1 item'
            : `${cart.items.reduce((acc, item) => acc + item.qty, 0)} items`}
        </StatHelpText>
      </Stat>
      <PrimaryButton
        label={emptyCart ? 'Browse Products' : 'Proceed to Checkout'}
        onClick={emptyCart ? () => history.push('/') : handleCheckout}
        rightIcon={emptyCart ? <FiShoppingBag /> : <FiCreditCard />}
        mt={3}
      />
    </Stack>
  )

  return <ContentSidebar content={<Content />} sidebar={<Sidebar />} />
}

export default withRouter(Cart)
