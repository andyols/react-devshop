import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { verifyPassword } from 'api'
import {
  FormButtons,
  FormInput,
  FormWrapper,
  SecondaryHeading
} from 'components/Shared'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updatePasswordSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const UpdatePasswordForm = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const loaded = !auth.loading
  const { _id, token } = auth.user

  /**
   * TODO: password unmasking using a show password checkbox
   */

  const { register, handleSubmit, errors, setError, clearErrors } = useForm({
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

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SecondaryHeading text='Password' fontSize='lg' pt={3} />
      <Divider />
      <FormInput
        id='passwordold'
        label='Old Password'
        type='password'
        error={errors.passwordold}
        ref={register}
        help='If you need to change your password, please verify your current password'
        disabled={!loaded}
      />
      <FormInput
        id='password'
        label='New Password'
        type='password'
        error={errors.password}
        ref={register}
        disabled={!loaded}
      />
      <FormInput
        id='passwordconfirm'
        label='Confirm New Password'
        type='password'
        error={errors.passwordconfirm}
        ref={register}
        disabled={!loaded}
      />
      <FormButtons
        primaryLabel='Update Password'
        isLoading={!loaded}
        disabled={!loaded}
        size='sm'
      />
    </FormWrapper>
  )
}

export default UpdatePasswordForm
