import {
  Badge,
  Divider,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
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
import {
  Alert,
  PrimaryHeading,
  SecondaryHeading,
  Subtitle
} from 'components/Shared'
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
  const { data, status } = useQuery(
    ['order', { id, token }],
    requestOrderById,
    { retry: 3, refetchOnWindowFocus: false }
  )

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

  const error = status === 'error'
  const isLoaded = status !== 'loading' && !error && !order.loading
  // const isLoaded = false

  const Content = () => (
    <Stack w='90%' spacing={3}>
      <PrimaryHeading text='Order Summary' />
      <Divider />
      <HStack>
        <SecondaryHeading text='Shipping' />
        <Skeleton w='10ch' h='2ch' {...{ isLoaded }}>
          <Badge colorScheme={data?.isDelivered ? 'green' : 'yellow'}>
            {data?.isDelivered ? 'delivered' : 'in transit'}
          </Badge>
        </Skeleton>
      </HStack>
      <SkeletonText
        maxW='xs'
        skeletonHeight='10px'
        spacing={3}
        {...{ isLoaded }}
      >
        <Stack spacing={0}>
          <Subtitle text={data?.user?.name} icon={FiUser} />
          <Subtitle
            text={data?.user?.email}
            icon={FiMail}
            as={Link}
            href={`mailto:${data?.user?.email}`}
          />
          <Subtitle
            text={`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city} ${data?.shippingAddress?.postalcode}, ${data?.shippingAddress?.country}`}
            icon={FiHome}
          />
        </Stack>
      </SkeletonText>
      <Divider />
      <HStack>
        <SecondaryHeading text='Payment' />
        <Skeleton w='10ch' h='2ch' {...{ isLoaded }}>
          <Badge colorScheme={data?.isPaid ? 'green' : 'red'}>
            {data?.isPaid
              ? `paid on ${new Date(data?.paidAt).toLocaleString()}`
              : 'not paid'}
          </Badge>
        </Skeleton>
      </HStack>
      <SkeletonText
        maxW='20ch'
        noOfLines={1}
        skeletonHeight='10px'
        {...{ isLoaded }}
      >
        <Subtitle text={`${data?.paymentMethod}`} icon={FiCreditCard} />
      </SkeletonText>
      <Divider />
      <SecondaryHeading text='Items' />
      <Stack spacing={3} divider={<Divider />}>
        {data?.orderItems.map((item) => (
          <SimpleGrid minChildWidth='25ch' gap={3} key={item._id}>
            <HStack spacing={6} maxW='35ch'>
              {item.image && (
                <SkeletonCircle {...{ isLoaded }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    boxSize='32px'
                    fit='cover'
                    borderRadius='base'
                    ignoreFallback
                  />
                </SkeletonCircle>
              )}
              <SkeletonText
                maxW='xs'
                noOfLines={2}
                skeletonHeight='10px'
                {...{ isLoaded }}
              >
                <Text fontWeight='semibold' lineHeight='1.2rem'>
                  {item.name}
                </Text>
              </SkeletonText>
            </HStack>
            <HStack justifySelf='flex-end' fontSize='sm'>
              <Skeleton maxH='3ch' {...{ isLoaded }}>
                <Text color='gray.500'>{`${item.qty} x $${item.price} =`}</Text>
                <Text>{`$${(item.price * item.qty).toFixed(2)}`}</Text>
              </Skeleton>
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
      <SkeletonText
        noOfLines={3}
        skeletonHeight='10px'
        spacing={5}
        {...{ isLoaded }}
      >
        <HStack justify='space-between' px={3} color='gray.500'>
          <Text>Items</Text>
          <Text>${formatPrice(data?.itemsPrice)}</Text>
        </HStack>
        <HStack justify='space-between' px={3} color='gray.500'>
          <Text>Shipping</Text>
          <Text>${formatPrice(data?.shippingPrice)}</Text>
        </HStack>
        <HStack justify='space-between' px={3} color='gray.500'>
          <Text>Tax</Text>
          <Text>${formatPrice(data?.taxPrice)}</Text>
        </HStack>
      </SkeletonText>
      <Divider />
      <SkeletonText
        noOfLines={1}
        skeletonHeight='12px'
        pt={isLoaded ? 0 : 3}
        {...{ isLoaded }}
      >
        <HStack justify='space-between' px={3}>
          <Text fontWeight='semibold'>Total</Text>
          <Text>${formatPrice(data?.totalPrice)}</Text>
        </HStack>
      </SkeletonText>
      {order.error && (
        <Alert title='Oops!' description={order.error} status='error' />
      )}
      <Stack py={3} px={3}>
        {!data?.isPaid &&
          (!paypalReady ? (
            <Spinner />
          ) : (
            <PayPalButton
              amount={data?.totalPrice}
              onSuccess={handlePaymentSuccess}
            />
          ))}
      </Stack>
    </Stack>
  )

  return error ? (
    <Alert
      status='error'
      title='Oops!'
      description="We couldn't seem to find your order..."
    />
  ) : (
    <ContentSidebar
      content={<Content />}
      sidebar={<Sidebar />}
      minSidebarW='30ch'
      pt={3}
    />
  )
}

export default Order
