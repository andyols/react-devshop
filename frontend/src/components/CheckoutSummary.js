import {
  Divider,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  FiChevronLeft,
  FiCreditCard,
  FiEdit,
  FiHome,
  FiTruck
} from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { ContentSidebar } from './Layout'
import {
  FormButtons,
  PrimaryHeading,
  SecondaryButton,
  SecondaryHeading,
  Subtitle
} from './Shared'

const CheckoutSummary = ({ setStep }) => {
  const checkout = useSelector((state) => state.checkout)
  const { address, city, postalcode, country } = checkout.shipping
  const cart = useSelector((state) => state.cart)

  // Calculate and format prices
  const format = (price) => (Math.round(price * 100) / 100).toFixed(2)
  const itemsPrice = format(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  const shippingPrice = format(cart.itemsPrice > 100 ? 0 : 10)
  const taxPrice = format(Number((0.15 * itemsPrice).toFixed(2)))
  const totalPrice = format(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  )

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
      <FormButtons
        primaryLabel='Submit'
        primaryIcon={<FiTruck />}
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
