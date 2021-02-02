import { Divider, Stack } from '@chakra-ui/react'
import {
  PasswordFormSwapper,
  UpdateProfileForm
} from 'components/Forms/Profile'
import { ContentSidebar } from 'components/Layout'
import { PrimaryHeading, Subtitle, Toast } from 'components/Shared'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Profile = () => {
  const auth = useSelector((state) => state.auth)

  const Content = () => (
    <Stack w='90%'>
      <PrimaryHeading text={`Hello, ${auth.user.name.split(' ')[0]}`} />
      <Subtitle text='Here you can view and customize your profile.' />
      <Divider />
      <UpdateProfileForm />
      <PasswordFormSwapper />
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
    <>
      <Toast />
      <ContentSidebar
        content={<Content />}
        sidebar={<Sidebar />}
        minSidebarW='30ch'
      />
    </>
  )
}

export default withRouter(Profile)
