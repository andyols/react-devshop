import {
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import CheckoutSummary from 'components/CheckoutSummary'
import { PaymentForm, ShippingForm } from 'components/Forms'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Checkout = () => {
  // redux
  const checkout = useSelector((state) => state.checkout)
  const disablePaymentStep = !checkout.shipping.address
  const disableConfirmStep = disablePaymentStep || !checkout.payment

  // local state
  const [step, setStep] = useState(0)
  const handleStepChange = (index) => setStep(index)

  return (
    <Tabs index={step} onChange={handleStepChange}>
      <Stack>
        <Container maxW='xl'>
          <TabList>
            <Tab>Shipping</Tab>
            <Tab isDisabled={disablePaymentStep}>Payment</Tab>
            <Tab isDisabled={disableConfirmStep}>Confirmation</Tab>
          </TabList>
        </Container>

        <TabPanels>
          <TabPanel>
            <ShippingForm setStep={handleStepChange} />
          </TabPanel>
          <TabPanel>
            <PaymentForm setStep={handleStepChange} />
          </TabPanel>
          <TabPanel>
            <CheckoutSummary />
          </TabPanel>
        </TabPanels>
      </Stack>
    </Tabs>
  )
}

export default Checkout
