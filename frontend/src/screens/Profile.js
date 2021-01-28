import { Divider, Stack } from '@chakra-ui/react'
import { UpdatePasswordForm, UpdateProfileForm } from 'components/Auth'
import { ContentSidebar } from 'components/Layout'
import { PrimaryHeading, Subtitle } from 'components/Shared'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Profile = () => {
  const name = useSelector((state) => state.auth.user.name)

  const Content = () => (
    <Stack w='90%'>
      <PrimaryHeading text={`Hello, ${name.split(' ')[0]}`} />
      <Subtitle text='Here you can view and customize your profile.' />
      <Divider />
      <UpdateProfileForm />
      <UpdatePasswordForm />
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
