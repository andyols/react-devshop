import { Divider, Flex, HStack, Skeleton, Stack, Text } from '@chakra-ui/react'
import { requestCreateOrder } from 'api'
import { SecondaryButton } from 'components/Shared/Buttons'
import { Alert } from 'components/Shared/Feedback'
import { FormButtons } from 'components/Shared/Form'
import { ItemList } from 'components/Shared/Lists'
import { SecondaryHeading, Subtitle } from 'components/Shared/Typography'
import { useEffect } from 'react'
import { FiChevronLeft, FiCreditCard, FiEdit, FiHome } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { create } from 'slices/orderSlice'
import { formatPrice } from 'utils/functions'

const Summary = ({ setStep }) => {
  // redux
  const dispatch = useDispatch()
  const checkout = useSelector(state => state.checkout)
  const { address, city, postalcode, country } = checkout.shipping
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.auth.user)
  const order = useSelector(state => state.order)

  // router
  const history = useHistory()

  // Calculate and format prices
  const itemsPrice = formatPrice(
    cart.items.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const shippingPrice = formatPrice(cart.items.itemsPrice > 100 ? 0 : 10)
  const taxPrice = formatPrice(Number((0.15 * itemsPrice).toFixed(2)))
  const totalPrice = formatPrice(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  )

  const handleOrderSubmit = () =>
    dispatch(
      create(
        requestCreateOrder,
        {
          orderItems: cart.items,
          shippingAddress: checkout.shipping,
          paymentMethod: checkout.payment,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice
        },
        user.token
      )
    )

  useEffect(() => {
    if (order.created) {
      history.push(`/order/${order.id}`)
    }
  }, [order.created, order.id, history])

  return (
    <Stack maxW='xl' margin='auto'>
      <FormButtons
        secondaryLabel='Back'
        secondaryIcon={<FiChevronLeft />}
        secondaryAction={() => setStep(1)}
        hidePrimary={true}
        variant='ghost'
        pt={0}
      />
      <Skeleton isLoaded>
        <Stack>
          {/* SHIPPING */}
          <Flex dir='row' justify='space-between' align='center'>
            <SecondaryHeading text='Shipping' />
            <SecondaryButton
              variant='ghost'
              rightIcon={<FiEdit />}
              onClick={() => setStep(0)}
              p={0}
            />
          </Flex>
          <Divider />
          <Subtitle
            text={`${address}, ${city} ${postalcode}, ${country}`}
            icon={FiHome}
          />

          {/* PAYMENT */}
          <Flex dir='row' justify='space-between' align='center'>
            <SecondaryHeading text='Payment Method' />
            <SecondaryButton
              variant='ghost'
              rightIcon={<FiEdit />}
              onClick={() => setStep(1)}
              p={0}
            />
          </Flex>
          <Divider />
          <Subtitle text={`${checkout.payment}`} icon={FiCreditCard} />

          {/* ITEMS */}
          <Flex dir='row' justify='space-between' align='center'>
            <SecondaryHeading text='Items' />
            <SecondaryButton
              variant='ghost'
              rightIcon={<FiEdit />}
              onClick={() => history.push('/cart')}
              p={0}
            />
          </Flex>
          <Divider />
          <ItemList items={cart.items} />

          {/* PRICING */}
          <SecondaryHeading text='Pricing' as='h2' pt={3} />
          <Divider />
          <HStack justify='space-between' color='gray.500'>
            <Text>Items</Text>
            <Text>${itemsPrice}</Text>
          </HStack>
          <HStack justify='space-between' color='gray.500'>
            <Text>Shipping</Text>
            <Text>${shippingPrice}</Text>
          </HStack>
          <HStack justify='space-between' color='gray.500'>
            <Text>Tax</Text>
            <Text>${taxPrice}</Text>
          </HStack>
          <Divider />
          <HStack justify='space-between'>
            <Text>Total</Text>
            <Text fontWeight='semibold'>${totalPrice}</Text>
          </HStack>

          {/* BUTTONS */}
          {order.error && (
            <Alert title='Oops!' description={order.error} status='error' />
          )}
          <FormButtons
            primaryLabel='Confirm Order'
            primaryAction={handleOrderSubmit}
            alignSelf='flex-end'
          />
        </Stack>
      </Skeleton>
    </Stack>
  )
}

export default Summary
