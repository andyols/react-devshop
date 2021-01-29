import {
  Container,
  Divider,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { RegisterForm } from 'components/Forms'
import { PrimaryHeading } from 'components/Shared'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Link as RouterLink,
  useHistory,
  useLocation,
  withRouter
} from 'react-router-dom'

const Register = () => {
  // redux
  const auth = useSelector((state) => state.auth)

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
        <PrimaryHeading text='Create a new account' />
        <Divider />
        <RegisterForm />
        <Divider />
        <Text alignSelf='center'>
          Already have an account?{' '}
          <Link
            as={RouterLink}
            to={'/login'}
            color={useColorModeValue('blue.500', 'blue.300')}
          >
            Login
          </Link>{' '}
        </Text>
      </Stack>
    </Container>
  )
}

export default withRouter(Register)
