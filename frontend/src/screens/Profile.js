import { Divider, Stack, useBreakpointValue } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestUserProfile } from 'api'
import { ContentSidebar } from 'components/Layout'
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
import { FiMail, FiUser, FiUserCheck } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const Profile = () => {
  const auth = useSelector((state) => state.auth)
  const toastPosition = useBreakpointValue({ base: 'top', md: 'bottom' })
  const dispatch = useDispatch()
  const token = auth.user.token

  const {
    data: profile,
    isError,
    error,
    isSuccess,
    isFetchedAfterMount
  } = useQuery(['profile', { token }], () => requestUserProfile(token), {
    enabled: !!token,
    refetchOnWindowFocus: false
  })
  const loaded = isSuccess && isFetchedAfterMount && !auth.loading

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(updateSchema)
  })

  useEffect(() => {
    if (loaded) {
      const name = profile.name
      const email = profile.email
      reset({ name, email })
    }
  }, [loaded, profile, reset, toastPosition, auth])

  const onSubmit = (data) =>
    dispatch(
      authRequest({
        ...data,
        type: 'update',
        _id: auth.user._id,
        token: auth.user.token
      })
    )
  const Content = () => (
    <Stack w='90%'>
      <PrimaryHeading
        text={`Hello, ${loaded ? profile?.name?.split(' ')[0] : ''}`}
      />
      <Subtitle text='Here you can view and customize your profile.' />
      <Divider />
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id='name'
          error={errors.name}
          ref={register}
          leftAddon={<FiUser />}
          label='Name'
          size='sm'
          disabled={!loaded}
        />
        <FormInput
          id='email'
          label='Email'
          error={errors.email}
          ref={register}
          leftAddon={<FiMail />}
          size='sm'
          disabled={!loaded}
        />
        <FormButtons
          primaryIcon={<FiUserCheck />}
          primaryLabel='Update Profile'
          secondaryLabel='Reset'
          isLoading={!loaded}
          disabled={!loaded}
          size='sm'
        />
      </FormWrapper>
    </Stack>
  )

  const Sidebar = () => (
    <Stack w='100%'>
      <PrimaryHeading text='My Orders' as='h2' />
      <Subtitle text='See the status of all your orders' />
      <Divider />
    </Stack>
  )

  if (isError)
    return (
      <Alert
        status='error'
        title='Oops!'
        description={error.response.data.message}
      />
    )

  return (
    <ContentSidebar
      content={<Content />}
      sidebar={<Sidebar />}
      minSidebarW='30ch'
    />
  )
}

export default withRouter(Profile)
