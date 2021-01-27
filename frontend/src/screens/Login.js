import {
  Container,
  Divider,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  FormButtons,
  FormInput,
  FormWrapper,
  PrimaryHeading
} from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { loginSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const Login = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(loginSchema)
  })
  // check if any values in errors resolve truthy
  const formInvalid = Object.values(errors).some(Boolean)

  const onSubmit = (data) => dispatch(authRequest({ ...data, type: 'login' }))

  useEffect(() => {
    if (user?.token) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  return (
    <Container maxW='lg'>
      <Stack spacing={3}>
        <PrimaryHeading text='Sign In' />
        <Divider />
        {auth?.error && (
          <Alert status='error' title='Oops!' description={auth.error} />
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)} spacing={3}>
          <FormInput
            id='email'
            label='Email Address'
            error={errors.email}
            ref={register}
          />
          <FormInput
            id='password'
            label='Password'
            error={errors.password}
            ref={register}
          />
          <FormButtons
            isLoading={auth.loading}
            disabled={formInvalid}
            primaryIcon={<FiLogIn />}
            primaryLabel='Sign In'
            secondaryLabel='Continue as Guest'
            secondaryAction={() => history.push('/')}
          />
        </FormWrapper>
        <Divider />
        <Text alignSelf='center'>
          New customer?{' '}
          <Link
            as={RouterLink}
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            color={useColorModeValue('blue.500', 'blue.300')}
          >
            Register
          </Link>{' '}
        </Text>
      </Stack>
    </Container>
  )
}

export default Login
