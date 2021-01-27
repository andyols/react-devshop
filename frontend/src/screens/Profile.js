import { Divider, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContentSidebar } from 'components/Layout'
import {
  FormButtons,
  FormInput,
  FormWrapper,
  PrimaryHeading,
  Subtitle
} from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiMail, FiUser, FiUserCheck } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { _id, name, email, token } = auth.user
  const loaded = !auth.loading

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(updateSchema)
  })

  const onSubmit = (data) =>
    dispatch(
      authRequest({
        ...data,
        type: 'update',
        _id,
        token
      })
    )

  useEffect(() => {
    if (loaded) {
      reset({ name, email })
    }
  }, [loaded, name, email, reset])

  const Content = () => (
    <Stack w='90%'>
      <PrimaryHeading text={`Hello, ${loaded ? name.split(' ')[0] : ''}`} />
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

  return (
    <ContentSidebar
      content={<Content />}
      sidebar={<Sidebar />}
      minSidebarW='30ch'
    />
  )
}

export default withRouter(Profile)
