import {
  Container,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  FormInput,
  FormWrapper,
  PrimaryButton,
  SecondaryButton
} from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiLogIn } from 'react-icons/fi'
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
          <Stack
            direction={useBreakpointValue(['column', 'row'])}
            py={3}
            justify='space-between'
          >
            <PrimaryButton
              type='submit'
              label='Sign In'
              isLoading={user?.loading}
              disabled={formInvalid}
              rightIcon={<FiLogIn />}
            />
            <SecondaryButton
              type='button'
              label='Continue as Guest'
              onClick={() => history.push('/')}
            />
          </Stack>
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
