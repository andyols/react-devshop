import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { verifyPassword } from 'api'
import {
  FormButtons,
  FormWrapper,
  PasswordInput,
  SecondaryHeading
} from 'components/Shared'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updatePasswordSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const UpdatePasswordForm = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const loaded = !auth.loading
  const { _id, token } = auth.user

  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    reset
  } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(updatePasswordSchema)
  })
  const onSubmit = async (data) => {
    try {
      clearErrors()
      const verified = await verifyPassword(data.passwordold, token)
      if (verified) {
        const password = data.password
        dispatch(
          authRequest({
            password,
            type: 'update',
            _id,
            token
          })
        )
      }
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      if (message === 'Invalid password')
        setError('passwordold', {
          type: 'manual',
          message: 'Incorrect Password'
        })
    }
  }

  const [showOld, setShowOld] = useState(false)
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleShowOld = () => setShowOld(!showOld)
  const handleShow = () => setShow(!show)
  const handleShowConfirm = () => setShowConfirm(!showConfirm)

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SecondaryHeading text='Password' fontSize='lg' pt={3} />
      <Divider />
      <PasswordInput
        id='passwordold'
        label='Old Password'
        error={errors.passwordold}
        ref={register}
        show={showOld}
        handleClick={handleShowOld}
        disabled={!loaded}
      />
      <PasswordInput
        id='password'
        label='New Password'
        error={errors.password}
        ref={register}
        show={show}
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
