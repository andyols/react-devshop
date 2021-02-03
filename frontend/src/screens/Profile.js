import { Divider, Stack } from '@chakra-ui/react'
import { requestUserOrders } from 'api'
import {
  PasswordFormSwapper,
  UpdateProfileForm
} from 'components/Forms/Profile'
import { ContentSidebar } from 'components/Layout'
import { Alert, Loader } from 'components/Shared/Feedback'
import { PrimaryHeading, Subtitle } from 'components/Shared/Typography'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Profile = () => {
  const auth = useSelector((state) => state.auth)
  const { token } = auth.user

  const { data, isLoading, isError } = useQuery(
    ['userOrders', { token }],
    requestUserOrders,
    { retry: 3, refetchOnWindowFocus: false, enabled: !!token }
  )

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
      {isError && (
        <Alert status='error' title='Oops!' description='Server error' />
      )}
    </Stack>
  )

  return isLoading ? (
    <Loader />
  ) : (
    <ContentSidebar
      content={<Content />}
      sidebar={<Sidebar />}
      minSidebarW='30ch'
    />
  )
}

export default withRouter(Profile)
