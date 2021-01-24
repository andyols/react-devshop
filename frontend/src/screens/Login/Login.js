import { Container, Divider, Heading, HStack, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input, PrimaryButton, SecondaryButton } from 'components/Shared'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiLogIn } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

const Login = () => {
  const history = useHistory()
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Not a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required')
  })

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  if (errors.email?.message) console.log(errors.email.message)

  const onSubmit = (data) => console.log(data)

  return (
    <Container maxW='lg'>
      <Stack>
        <Heading as='h1' size='lg'>
          Sign In
        </Heading>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id='email'
            label='Email Address'
            error={errors.email}
            ref={register}
          />
          <Input
            id='password'
            label='Password'
            error={errors.password}
            ref={register}
          />
          <HStack mt={5} justify='space-between'>
            <SecondaryButton
              type='button'
              label='Back'
              leftIcon={<FiArrowLeft />}
              onClick={() => history.push('/')}
            />
            <PrimaryButton
              type='submit'
              label='Sign In'
              rightIcon={<FiLogIn />}
            />
          </HStack>
        </form>
      </Stack>
    </Container>
  )
}

export default Login
