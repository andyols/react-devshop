import { Divider, Spinner, Stack } from '@chakra-ui/react'
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
import { useForm } from 'react-hook-form'
import { FiKey, FiMail, FiUser, FiUserCheck } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { updateSchema } from 'schema/formSchemas'

const Profile = () => {
  const auth = useSelector((state) => state.auth)
  const history = useHistory()
  const token = auth.user.token

  const { data: profile, isError, error, isSuccess } = useQuery(
    ['profile', { token }],
    () => requestUserProfile(token),
    {
      enabled: !!token,
      refetchOnWindowFocus: false
    }
  )

  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(updateSchema)
  })
  const formInvalid = Object.values(errors).some(Boolean)
  const onSubmit = (data) => console.log(data)

  const Content = () => (
    <>
      {isSuccess ? (
        <Stack w='90%'>
          <PrimaryHeading text={`Hello, ${profile?.name?.split(' ')[0]}`} />
          <Subtitle text='Here you can view and customize your profile.' />
          <Divider />
          <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
            spacing={6}
            maxW='40ch'
          >
            <FormInput
              id='name'
              error={errors.name}
              ref={register}
              variant='flushed'
              value={profile.name}
              leftElement={<FiUser />}
            />
            <FormInput
              id='email'
              error={errors.email}
              ref={register}
              variant='flushed'
              value={profile.email}
              leftElement={<FiMail />}
            />
            <FormInput
              id='password'
              error={errors.password}
              ref={register}
              variant='flushed'
              leftElement={<FiKey />}
            />
            <FormButtons
              isLoading={auth.loading}
              disabled={formInvalid}
              primaryIcon={<FiUserCheck />}
              primaryLabel='Update Profile'
              secondaryLabel='Go Back'
              secondaryAction={() => history.push('/')}
            />
          </FormWrapper>
        </Stack>
      ) : (
        <Spinner size='xl' />
      )}
    </>
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
