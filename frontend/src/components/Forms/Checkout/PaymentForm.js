import {
  Divider,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { FormButtons, FormWrapper, PrimaryHeading } from 'components/Shared'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { savePayment } from 'slices/checkoutSlice'

const PaymentForm = ({ setStep }) => {
  // redux
  const dispatch = useDispatch()

  // local state
  const [method, setMethod] = useState('PayPal')

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(savePayment(method))
    setStep(2)
  }

  return (
    <FormWrapper
      onSubmit={onSubmit}
      spacing={3}
      maxW='xl'
      style={{ margin: '0 auto' }}
    >
      <PrimaryHeading text='Payment Method' />
      <Divider />
      <InputGroup>
        <RadioGroup onChange={setMethod} value={method}>
          <FormLabel>Select a payment method</FormLabel>
          <Stack>
            <Radio value='PayPal'>PayPal or Credit Card</Radio>
            {/* <Radio value='Stripe'>Stripe</Radio> */}
          </Stack>
        </RadioGroup>
      </InputGroup>
      <FormButtons
        primaryLabel='Next'
        primaryIcon={<FiChevronRight />}
        secondaryLabel='Back'
        secondaryIcon={<FiChevronLeft />}
        secondaryAction={() => setStep(0)}
      />
    </FormWrapper>
  )
}

export default PaymentForm
