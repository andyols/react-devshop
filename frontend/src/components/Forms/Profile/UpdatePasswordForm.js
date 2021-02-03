import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestUserUpdate } from 'api'
import { FormButtons, FormWrapper, PasswordInput } from 'components/Shared/Form'
import { SecondaryHeading } from 'components/Shared/Typography'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updatePasswordSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const UpdatePasswordForm = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const token = auth.user.token
  const loaded = !auth.loading

  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(updatePasswordSchema)
  })
  const onSubmit = (data) =>
    dispatch(authRequest(requestUserUpdate, data, token))

  const [showPassword, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const handleShow = () => setShow(!showPassword)
  const handleShowConfirm = () => setShowConfirm(!showConfirm)

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SecondaryHeading text='Password' fontSize='lg' pt={3} />
      <Divider />
      <PasswordInput
        id='password'
        label='New Password'
        error={errors.password}
        ref={register}
        show={showPassword}
        handleClick={handleShow}
        disabled={!loaded}
      />
      <PasswordInput
        id='passwordconfirm'
        label='Confirm New Password'
        error={errors.passwordconfirm}
        ref={register}
        show={showConfirm}
        handleClick={handleShowConfirm}
        disabled={!loaded}
      />
      <FormButtons
        primaryLabel='Update Password'
        secondaryAction={() => reset()}
        secondaryLabel='Reset'
        isLoading={!loaded}
        disabled={!loaded}
        justify='flex-start'
        size='sm'
      />
    </FormWrapper>
  )
}

export default UpdatePasswordForm
