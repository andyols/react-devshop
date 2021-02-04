import {
  Container,
  Divider,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { LoginForm } from 'components/Forms'
import { PrimaryHeading } from 'components/Shared/Typography'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'

const Login = () => {
  // redux
  const auth = useSelector(state => state.auth)

  // react-router
  const history = useHistory()
  const location = useLocation()

  // redirect logged in user
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (auth.user.token) {
      history.push(redirect)
    }
  }, [history, auth.user, redirect])

  return (
    <Container maxW='lg'>
      <Stack spacing={3}>
        <PrimaryHeading text='Sign In' />
        <Divider />
        <LoginForm />
        <Divider />
        <Text alignSelf='center'>
          New customer?{' '}
          <Link
            as={RouterLink}
            to={'/register'}
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
