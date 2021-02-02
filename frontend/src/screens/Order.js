import {
  Badge,
  Divider,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  requestOrderById,
  requestOrderUpdate,
  requestPaypalClientId
} from 'api'
import { ContentSidebar } from 'components/Layout'
import { PrimaryHeading, SecondaryHeading, Subtitle } from 'components/Shared'
import { useEffect, useState } from 'react'
import { FiCreditCard, FiHome, FiMail, FiUser } from 'react-icons/fi'
import { PayPalButton } from 'react-paypal-button-v2'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { pay } from 'slices/orderSlice'
import { formatPrice } from 'utils/functions'
import { generatePaypalSDKScript } from 'utils/paypal'

const Order = () => {
  // router
  const { id } = useParams()

  // redux
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.token)
  const order = useSelector((state) => state.order)

  // local state
  const [paypalReady, setPaypalReady] = useState(false)

  // use react-query to fetch/cache order data
  const queryClient = useQueryClient()
  const { data, status } = useQuery(['order', { id, token }], requestOrderById)

  // invalidate order data upon payment success
  useEffect(() => {
    if (order.paid) queryClient.invalidateQueries('order')
  }, [order, queryClient])

  const handlePaymentSuccess = async (paymentResult) => {
    dispatch(pay(requestOrderUpdate, { paymentResult, id }, token))
  }

  // build paypal script if order has not been paid
  useEffect(() => {
    const paypalScript = async () => {
      const clientId = await requestPaypalClientId()
      const script = generatePaypalSDKScript(clientId)
      script.onload = () => setPaypalReady(true)
      document.body.appendChild(script)
    }
    if (data) {
      const { isPaid } = data
      if (!isPaid && !window.paypal) {
        paypalScript()
      } else {
        setPaypalReady(true)
      }
    }
  }, [data])

  if (status === 'loading' || order.loading) return <Spinner />

  const { address, city, postalcode, country } = data.shippingAddress
  const {
    isPaid,
    paidAt,
    isDelivered,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = data
  const { name, email } = data.user

  const Content = () => (
    <Stack w='90%' spacing={3}>
      <PrimaryHeading text='Order Summary' />
      <Divider />
      <HStack>
        <SecondaryHeading text='Shipping' />
        <Badge colorScheme={isDelivered ? 'green' : 'yellow'}>
          {isDelivered ? 'delivered' : 'in transit'}
        </Badge>
      </HStack>
      <Stack spacing={0}>
        <Subtitle text={name} icon={FiUser} />
        <Subtitle
          text={email}
          icon={FiMail}
          as={Link}
          href={`mailto:${email}`}
        />
        <Subtitle
          text={`${address}, ${city} ${postalcode}, ${country}`}
          icon={FiHome}
        />
      </Stack>
      <Divider />
      <HStack>
        <SecondaryHeading text='Payment' />
        <Badge colorScheme={isPaid ? 'green' : 'red'}>
          {isPaid ? `paid on ${new Date(paidAt).toLocaleString()}` : 'not paid'}
        </Badge>
      </HStack>
      <Subtitle text={`${paymentMethod}`} icon={FiCreditCard} />
      <Divider />
      <SecondaryHeading text='Items' />
      <Stack spacing={3} divider={<Divider />}>
        {orderItems.map((item) => (
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
        <Text>${formatPrice(itemsPrice)}</Text>
      </HStack>
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Shipping</Text>
        <Text>${formatPrice(shippingPrice)}</Text>
      </HStack>
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Tax</Text>
        <Text>${formatPrice(taxPrice)}</Text>
      </HStack>
      <Divider />
      <HStack justify='space-between' px={3}>
        <Text fontWeight='semibold'>Total</Text>
        <Text>${formatPrice(totalPrice)}</Text>
      </HStack>
      {/* {order.error && (
        <Alert title='Oops!' description={order.error} status='error' />
      )} */}
      <Stack py={3} px={3}>
        {!isPaid &&
          (!paypalReady ? (
            <Spinner />
          ) : (
            <PayPalButton
              amount={totalPrice}
              onSuccess={handlePaymentSuccess}
            />
          ))}
      </Stack>
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

export default Order
