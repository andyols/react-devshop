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
import { requestOrderById } from 'api'
import { ContentSidebar } from 'components/Layout'
import {
  FormButtons,
  PrimaryHeading,
  SecondaryHeading,
  Subtitle
} from 'components/Shared'
import {
  FiChevronLeft,
  FiCreditCard,
  FiHome,
  FiMail,
  FiTruck,
  FiUser
} from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatPrice } from 'utils'

const Order = () => {
  // extract necessary variables from react-router and redux
  const { id } = useParams()
  const token = useSelector((state) => state.auth.user.token)

  // use react-query to get current order data
  const { data, status } = useQuery(
    ['order', { id, token }],
    requestOrderById,
    {
      refetchOnWindowFocus: false
    }
  )

  if (status === 'loading') return <Spinner />

  const { address, city, postalcode, country } = data.shippingAddress
  const {
    isPayed,
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
        <Badge colorScheme={isDelivered ? 'green' : 'red'}>
          {isPayed ? 'paid' : 'not paid'}
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
      <FormButtons
        primaryLabel='Submit'
        primaryIcon={<FiTruck />}
        secondaryLabel='Back'
        secondaryIcon={<FiChevronLeft />}
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

export default Order
