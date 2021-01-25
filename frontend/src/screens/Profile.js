import { Divider, SimpleGrid, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestUserProfile } from 'api'
import {
  Alert,
  FormButtons,
  FormInput,
  FormWrapper,
  PrimaryHeading,
  Subtitle
} from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiUserCheck } from 'react-icons/fi'
import { useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { registerSchema } from 'schema/formSchemas'

const Profile = ({ history }) => {
  const queryClient = useQueryClient()
  const auth = useSelector((state) => state.auth)
  const token = auth.user.token
  const authLoading = auth.loading

  const { data: profile, isError, error } = useQuery(
    ['profile', { token }],
    () => requestUserProfile(token),
    {
      enabled: !!token,
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(registerSchema)
  })
  // check if any values in errors resolve truthy
  const formInvalid = Object.values(errors).some(Boolean)

  useEffect(() => {
    if (!token && !authLoading) {
      reset()
      queryClient.removeQueries('profile')
      history.push('/login')
    }
  }, [token, authLoading, queryClient, reset, history])

  const onSubmit = (data) => console.log(data)

  if (isError)
    return (
      <Alert
        status='error'
        title='Oops!'
        description={error.response.data.message}
      />
    )

  return (
    <Stack>
      <PrimaryHeading text={`Hello, ${profile?.name?.split(' ')[0]}`} />
      <Subtitle text='Here you can view and customize your account profile.' />

      <SimpleGrid columns={[1, 2]} spacing={[3, 4, 5]} pt={3}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Divider />
          <FormInput
            value={profile?.name}
            id='name'
            label='Name'
            error={errors.name}
            ref={register}
          />
          <FormInput
            value={profile?.email}
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
            disabled={formInvalid}
            primaryIcon={<FiUserCheck />}
            primaryLabel='Update'
            secondaryIcon={<FiArrowLeft />}
            secondaryLabel='Go Back'
            secondaryAction={() => history.push('/')}
          />
        </FormWrapper>
      </SimpleGrid>
    </Stack>
  )
}

export default Profile
