import {
  Badge,
  Divider,
  HStack,
  Link,
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
import { Alert } from 'components/Shared/Feedback'
import { ItemList } from 'components/Shared/Orders'
import {
  PrimaryHeading,
  SecondaryHeading,
  Subtitle
} from 'components/Shared/Typography'
import { useEffect, useState } from 'react'
import { FiCreditCard, FiHome, FiMail, FiUser } from 'react-icons/fi'
import { PayPalButton } from 'react-paypal-button-v2'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { cleanup, pay } from 'slices/orderSlice'
import { formatPrice } from 'utils/functions'
import { generatePaypalSDKScript } from 'utils/paypal'

const Order = () => {
  // router
  const { id } = useParams()

  // redux
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.user.token)
  const order = useSelector(state => state.order)

  // local state
  const [paypalReady, setPaypalReady] = useState(false)

  // use react-query to fetch/cache order data
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery(
    ['order', { id, token }],
    requestOrderById,
    { retry: 3, refetchOnWindowFocus: false }
  )

  const handlePaymentSuccess = async paymentResult => {
    dispatch(pay(requestOrderUpdate, { paymentResult, id }, token))
    await queryClient.invalidateQueries('order')
    dispatch(cleanup())
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

  const Content = () => (
    <Stack w='90%' spacing={3}>
      <PrimaryHeading text='Order Summary' />
      <Divider />
      <HStack>
        <SecondaryHeading text='Shipping' />
        <Badge colorScheme={data.isDelivered ? 'green' : 'orange'}>
          {data.isDelivered ? 'delivered' : 'in transit'}
        </Badge>
      </HStack>
      <Stack spacing={0}>
        <Subtitle text={data.user.name} icon={FiUser} />
        <Subtitle
          text={data.user.email}
          icon={FiMail}
          as={Link}
          href={`mailto:${data.user.email}`}
        />
        <Subtitle
          text={`${data.shippingAddress.address}, ${data.shippingAddress.city} ${data.shippingAddress.postalcode}, ${data.shippingAddress.country}`}
          icon={FiHome}
        />
      </Stack>
      <Divider />
      <HStack>
        <SecondaryHeading text='Payment' />
        <Badge colorScheme={data.isPaid ? 'green' : 'red'}>
          {data.isPaid
            ? `paid on ${new Date(data.paidAt).toLocaleString()}`
            : 'not paid'}
        </Badge>
      </HStack>
      <Subtitle text={`${data.paymentMethod}`} icon={FiCreditCard} />
      <Divider />
      <SecondaryHeading text='Items' />
      {data && <ItemList items={data.orderItems} />}
    </Stack>
  )

  const Sidebar = () => (
    <Stack boxShadow='base' p={3} borderRadius='base' w='100%'>
      <SecondaryHeading text='Pricing Overview' as='h2' />
      <Divider />
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Items</Text>
        <Text>${formatPrice(data.itemsPrice)}</Text>
      </HStack>
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Shipping</Text>
        <Text>${formatPrice(data.shippingPrice)}</Text>
      </HStack>
      <HStack justify='space-between' px={3} color='gray.500'>
        <Text>Tax</Text>
        <Text>${formatPrice(data.taxPrice)}</Text>
      </HStack>
      <Divider />
      <HStack justify='space-between' px={3}>
        <Text fontWeight='semibold'>Total</Text>
        <Text>${formatPrice(data.totalPrice)}</Text>
      </HStack>
      {order.error && (
        <Alert title='Oops!' description={order.error} status='error' />
      )}
      {!data.isPaid && (
        <Stack py={3} px={3}>
          {!paypalReady ? (
            <Spinner alignSelf='center' color='yellow.500' />
          ) : (
            <PayPalButton
              amount={data.totalPrice}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </Stack>
      )}
    </Stack>
  )

  return isError ? (
    <Alert
      status='error'
      title='Oops!'
      description={error.response.data.message}
    />
  ) : (
    !isLoading && (
      <ContentSidebar
        content={<Content />}
        sidebar={<Sidebar />}
        minSidebarW='30ch'
        pt={3}
      />
    )
  )
}

export default Order
