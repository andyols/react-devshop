import { yupResolver } from '@hookform/resolvers/yup'
import { requestUserRegister } from 'api'
import { Alert } from 'components/Shared/Feedback'
import { FormButtons, FormInput, FormWrapper } from 'components/Shared/Form'
import { useForm } from 'react-hook-form'
import { FiUserPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { registerSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const RegisterForm = () => {
  // redux
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // react-router
  const history = useHistory()

  // react-hook-form
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema)
  })
  const onSubmit = (data) => dispatch(authRequest(requestUserRegister, data))

  return (
    <>
      {auth.error && (
        <Alert status='error' title='Oops!' description={auth.error} />
      )}
      <FormWrapper onSubmit={handleSubmit(onSubmit)} spacing={3}>
        <FormInput
          id='name'
          label='Name'
          error={errors.name}
          ref={register}
          disabled={auth.loading}
        />
        <FormInput
          id='email'
          label='Email Address'
          error={errors.email}
          ref={register}
          disabled={auth.loading}
        />
        <FormInput
          id='password'
          label='Password'
          error={errors.password}
          ref={register}
          disabled={auth.loading}
        />
        <FormInput
          name='confirm'
          type='password'
          id='passwor2'
          label='Confirm Password'
          error={errors.confirm}
          ref={register}
          disabled={auth.loading}
        />
        <FormButtons
          isLoading={auth.loading}
          disabled={auth.loading}
          primaryIcon={<FiUserPlus />}
          primaryLabel='Create Account'
          secondaryLabel='Continue as Guest'
          secondaryAction={() => history.push('/')}
        />
      </FormWrapper>
    </>
  )
}

export default RegisterForm
