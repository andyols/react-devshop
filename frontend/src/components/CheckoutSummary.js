import {
  Divider,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react'
import { requestCreateOrder } from 'api'
import { useEffect } from 'react'
import {
  FiChevronLeft,
  FiCreditCard,
  FiEdit,
  FiHome,
  FiTruck
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { create } from 'slices/orderSlice'
import { formatPrice } from 'utils/functions'
import { ContentSidebar } from './Layout'
import {
  Alert,
  FormButtons,
  PrimaryHeading,
  SecondaryButton,
  SecondaryHeading,
  Subtitle
} from './Shared'

const CheckoutSummary = ({ setStep }) => {
  // redux
  const dispatch = useDispatch()
  const checkout = useSelector((state) => state.checkout)
  const { address, city, postalcode, country } = checkout.shipping
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const order = useSelector((state) => state.order)

  // router
  const history = useHistory()

  // Calculate and format prices
  const itemsPrice = formatPrice(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const shippingPrice = formatPrice(cart.itemsPrice > 100 ? 0 : 10)
  const taxPrice = formatPrice(Number((0.15 * itemsPrice).toFixed(2)))
  const totalPrice = formatPrice(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  )

  const handleOrderSubmit = () =>
    dispatch(
      create(
        requestCreateOrder,
        {
          orderItems: cart,
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
      history.replace(`/order/${order.id}`)
    }
  }, [order, history])

  const Content = () => (
    <Stack w='90%' spacing={3}>
      <PrimaryHeading text='Order Summary' />
      <Divider />
      <HStack justify='space-between'>
        <SecondaryHeading text='Shipping' />
        <SecondaryButton
          variant='ghost'
          rightIcon={<FiEdit />}
          onClick={() => setStep(0)}
        />
      </HStack>
      <Subtitle
        text={`${address}, ${city} ${postalcode}, ${country}`}
        icon={FiHome}
      />
      <Divider />
      <HStack justify='space-between'>
        <SecondaryHeading text='Payment Method' />
        <SecondaryButton
          variant='ghost'
          rightIcon={<FiEdit />}
          onClick={() => setStep(1)}
        />
      </HStack>
      <Subtitle text={`${checkout.payment}`} icon={FiCreditCard} />
      <Divider />
      <SecondaryHeading text='Items' />
      <Stack spacing={3} divider={<Divider />}>
        {cart.map((item) => (
          <SimpleGrid minChildWidth='25ch' gap={3} key={item._id}>
            <HStack spacing={6} maxW='35ch'>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize='32px'
                  fit='cover'
                  borderRadius='base'
                  ignoreFallback
                />
              )}
              <Text fontWeight='semibold' lineHeight='1.2rem'>
                {item.name}
              </Text>
            </HStack>
            <HStack justifySelf='flex-end' fontSize='sm'>
              <Text color='gray.500'>{`${item.qty} x $${item.price} =`}</Text>
              <Text>{`$${(item.price * item.qty).toFixed(2)}`}</Text>
            </HStack>
          </SimpleGrid>
        ))}
      </Stack>
    </Stack>
  )

  const Sidebar = () => (
    <Stack boxShadow='base' p={3} borderRadius='base' w='100%'>
      <SecondaryHeading text='Pricing Overview' as='h2' />
      <Divider />
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Items</Text>
        <Text>${itemsPrice}</Text>
      </HStack>
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Shipping</Text>
        <Text>${shippingPrice}</Text>
      </HStack>
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Tax</Text>
        <Text>${taxPrice}</Text>
      </HStack>
      <Divider />
      <HStack justify='space-between' px={3}>
        <Text fontWeight='semibold'>Total</Text>
        <Text>${totalPrice}</Text>
      </HStack>
      {order.error && (
        <Alert title='Oops!' description={order.error} status='error' />
      )}
      <FormButtons
        primaryLabel='Submit'
        primaryIcon={<FiTruck />}
        primaryAction={handleOrderSubmit}
        secondaryLabel='Back'
        secondaryIcon={<FiChevronLeft />}
        secondaryAction={() => setStep(1)}
      />
    </Stack>
  )

  return (
    <ContentSidebar
      content={<Content />}
      sidebar={<Sidebar />}
      minSidebarW='30ch'
      pt={3}
    />
  )
}

export default CheckoutSummary
