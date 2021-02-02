import {
  Container,
  HStack,
  Progress,
  Skeleton,
  Stack,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import CheckoutSummary from 'components/CheckoutSummary'
import { PaymentForm, ShippingForm } from 'components/Forms/Checkout'
import { Subtitle } from 'components/Shared'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Checkout = () => {
  // router
  const history = useHistory()

  // redux
  const cart = useSelector((state) => state.cart)

  // local state
  const [step, setStep] = useState(0)
  const handleStepChange = (index) => setStep(index)

  const stepText = {
    0: 'Shipping',
    1: 'Payment',
    2: 'Confirmation'
  }

  useEffect(() => {
    if (cart.items.length === 0) history.replace('/')
  }, [cart, history])

  return (
    <Tabs index={step} onChange={handleStepChange} colorScheme='pink'>
      <Stack>
        <Container maxW='xl' px={0}>
          <Stack>
            <HStack justify='space-between'>
              <Subtitle text={stepText[step]} />
              <Subtitle text={`Step ${step + 1} of 3`} />
            </HStack>
            <Progress
              borderRadius='base'
              colorScheme='purple'
              size='sm'
              value={step}
              min={0}
              max={2}
            />
          </Stack>
        </Container>

        <TabPanels>
          <TabPanel px={0}>
            <Skeleton isLoaded>
              <ShippingForm setStep={handleStepChange} />
            </Skeleton>
          </TabPanel>
          <TabPanel px={0}>
            <Skeleton isLoaded>
              <PaymentForm setStep={handleStepChange} />
            </Skeleton>
          </TabPanel>
          <TabPanel px={0}>
            <Skeleton isLoaded>
              <CheckoutSummary setStep={handleStepChange} />
            </Skeleton>
          </TabPanel>
        </TabPanels>
      </Stack>
    </Tabs>
  )
}

export default Checkout
