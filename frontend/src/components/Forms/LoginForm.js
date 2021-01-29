import { yupResolver } from '@hookform/resolvers/yup'
import { requestUserLogin } from 'api'
import { Alert, FormButtons, FormInput, FormWrapper } from 'components/Shared'
import { useForm } from 'react-hook-form'
import { FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const LoginForm = () => {
  // redux
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // react-router
  const history = useHistory()

  // react-hook-form
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema)
  })
  const onSubmit = (data) => dispatch(authRequest(requestUserLogin, data))

  return (
    <>
      {auth.error && (
        <Alert status='error' title='Oops!' description={auth.error} />
      )}
      <FormWrapper onSubmit={handleSubmit(onSubmit)} spacing={3}>
        <FormInput
          id='email'
          label='Email Address'
          error={errors.email}
          ref={register}
          disabled={auth.loading || auth.loading}
        />
        <FormInput
          id='password'
          label='Password'
          error={errors.password}
          ref={register}
          disabled={auth.loading}
        />
        <FormButtons
          isLoading={auth.loading}
          disabled={auth.loading}
          primaryIcon={<FiLogIn />}
          primaryLabel='Sign In'
          secondaryLabel='Continue as Guest'
          secondaryAction={() => history.push('/')}
        />
      </FormWrapper>
    </>
  )
}

export default LoginForm
