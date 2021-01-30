import { Divider, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { FiCreditCard, FiHome, FiTruck } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { ContentSidebar } from './Layout'
import { PrimaryButton, SecondaryHeading, Subtitle } from './Shared'

const CheckoutSummary = () => {
  const checkout = useSelector((state) => state.checkout)
  const { address, city, postalcode, country } = checkout.shipping
  const cart = useSelector((state) => state.cart)

  // Calculate prices
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shippingPrice = cart.itemsPrice > 100 ? 0 : 10
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2))
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  const Content = () => (
    <Stack w='90%' spacing={3}>
      <SecondaryHeading text='Shipping' />
      <Subtitle
        text={`${address}, ${city} ${postalcode}, ${country}`}
        icon={FiHome}
      />
      <Divider />
      <SecondaryHeading text='Payment Method' />
      <Subtitle text={`${checkout.payment}`} icon={FiCreditCard} />
      <Divider />
      <SecondaryHeading text='Items' />
      <Stack spacing={3} divider={<Divider />} mb={5} px={3}>
        {cart.map((item) => (
          <HStack spacing={3} justify='space-between' key={item._id}>
            <HStack spacing={6}>
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
            <HStack>
              <Text
                color='gray.500'
                fontSize='sm'
              >{`${item.qty} x $${item.price} =`}</Text>
              <Text>{`$${(item.price * item.qty).toFixed(2)}`}</Text>
            </HStack>
          </HStack>
        ))}
      </Stack>
    </Stack>
  )

  const Sidebar = () => (
    <Stack boxShadow='base' p={3} borderRadius='base' w='100%' spacing={3}>
      <SecondaryHeading text='Order Summary' as='h2' />
      <Divider />
      <HStack justify='space-between' px={3}>
        <Text color='gray.500'>Items</Text>
        <Text>${itemsPrice}</Text>
      </HStack>
      <HStack justify='space-between' px={3}>
        <Text color='gray.500'>Shipping</Text>
        <Text>${shippingPrice}</Text>
      </HStack>
      <HStack justify='space-between' px={3}>
        <Text color='gray.500'>Tax</Text>
        <Text>${taxPrice}</Text>
      </HStack>
      <HStack justify='space-between' px={3}>
        <Text fontWeight='semibold'>Total</Text>
        <Text>${totalPrice}</Text>
      </HStack>
      <Divider />
      <PrimaryButton label='Submit Order' rightIcon={<FiTruck />} />
    </Stack>
  )

  return (
    <ContentSidebar
      content={<Content />}
      sidebar={<Sidebar />}
      minSidebarW='30ch'
    />
  )
}

export default CheckoutSummary
