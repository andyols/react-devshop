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
import { login } from 'slices/userSlice'
import schema from './loginSchema'

const Login = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => dispatch(login(data))

  useEffect(() => {
    if (user?.token) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  return (
    <Container maxW='lg'>
      <Stack spacing={3}>
        <Heading as='h1' size='lg'>
          Sign In
        </Heading>
        <Divider />
        {user?.error && (
          <Alert status='error' title='Oops!' description={user.error} />
        )}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
          <Stack
            direction={useBreakpointValue(['column', 'row'])}
            py={3}
            justify='space-between'
          >
            <PrimaryButton
              type='submit'
              label='Sign In'
              isLoading={user?.loading}
              disabled={!!errors.email || !!errors.password}
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
