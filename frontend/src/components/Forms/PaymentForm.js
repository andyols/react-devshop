import {
  Divider,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { FormButtons, FormWrapper, PrimaryHeading } from 'components/Shared'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { save } from 'slices/checkoutSlice'

const PaymentForm = ({ setStep }) => {
  // redux
  const dispatch = useDispatch()

  // local state
  const [method, setMethod] = useState('PayPal')

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(save({ data: method, type: 'payment' }))
    setStep(2)
  }

  // save before component unmounts
  useEffect(() => {
    dispatch(save({ data: method, type: 'payment' }))
  }, [dispatch, method])

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
        primaryLabel='Go to Confirmation'
        secondaryLabel='Back'
        secondaryAction={() => setStep(0)}
      />
    </FormWrapper>
  )
}

export default PaymentForm
