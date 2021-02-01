import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormButtons,
  FormInput,
  FormWrapper,
  PrimaryHeading
} from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { shippingSchema } from 'schema/formSchemas'
import { saveShipping } from 'slices/checkoutSlice'

const ShippingForm = ({ setStep }) => {
  // redux
  const dispatch = useDispatch()
  const checkout = useSelector((state) => state.checkout)
  const { address, city, postalcode, country } = checkout.shipping

  // react-router
  const history = useHistory()

  // react-hook-form
  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(shippingSchema)
  })
  const onSubmit = (data) => {
    dispatch(saveShipping(data))
    setStep(1)
  }

  // load address info if exists
  useEffect(() => {
    if (checkout.shipping) {
      reset({ address, city, postalcode, country })
    }
  }, [reset, checkout, address, city, postalcode, country])

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      maxW='xl'
      style={{ margin: '0 auto' }}
    >
      <PrimaryHeading text='Shipping Information' />
      <Divider />
      <FormInput
        id='address'
        type='text'
        label='Shipping Address'
        error={errors.address}
        ref={register}
      />
      <FormInput
        id='city'
        type='text'
        label='City'
        error={errors.city}
        ref={register}
      />
      <FormInput
        id='postalcode'
        type='text'
        label='Postal Code'
        error={errors.postalcode}
        ref={register}
      />
      <FormInput
        id='country'
        type='text'
        label='Country'
        error={errors.country}
        ref={register}
      />
      <FormButtons
        primaryLabel='Next'
        primaryIcon={<FiChevronRight />}
        secondaryLabel='Back'
        secondaryIcon={<FiChevronLeft />}
        secondaryAction={() => history.push('/cart')}
      />
    </FormWrapper>
  )
}

export default ShippingForm
