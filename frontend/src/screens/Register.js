import {
  Container,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, FormButtons, FormInput, FormWrapper } from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiUserPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { registerSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const Register = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const auth = useSelector((state) => state.auth)
  const { user } = auth

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(registerSchema)
  })
  // check if any values in errors resolve truthy
  const formInvalid = Object.values(errors).some(Boolean)

  useEffect(() => {
    if (user?.token) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  const onSubmit = (data) => dispatch(authRequest(data))

  return (
    <Container maxW='lg'>
      <Stack spacing={3}>
        <Heading as='h1' size='lg'>
          Create a new Account
        </Heading>
        <Divider />
        {auth?.error && (
          <Alert status='error' title='Oops!' description={auth.error} />
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id='name'
            label='Name'
            error={errors.name}
            ref={register}
          />
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
          <FormInput
            name='confirm'
            id='password'
            label='Confirm Password'
            error={errors.confirm}
            ref={register}
          />
          <FormButtons
            isLoading={auth.loading}
            disabled={formInvalid}
            primaryIcon={<FiUserPlus />}
            primaryLabel='Create Account'
            secondaryLabel='Continue as Guest'
            secondaryAction={() => history.push('/')}
          />
        </FormWrapper>
        <Divider />
        <Text alignSelf='center'>
          Already have an account?{' '}
          <Link
            as={RouterLink}
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            color={useColorModeValue('blue.500', 'blue.300')}
          >
            Login
          </Link>{' '}
        </Text>
      </Stack>
    </Container>
  )
}

export default Register
