import { Divider, Stack } from '@chakra-ui/react'
import { requestUserOrders } from 'api'
import {
  PasswordFormSwapper,
  UpdateProfileForm
} from 'components/Forms/Profile'
import { ContentSidebar } from 'components/Layout'
import { Alert, Loader } from 'components/Shared/Feedback'
import {
  PrimaryHeading,
  SecondaryHeading,
  Subtitle
} from 'components/Shared/Typography'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { OrderTable } from './components'

const Profile = () => {
  const auth = useSelector((state) => state.auth)
  const { token } = auth.user

  const { data: orders, isLoading, isError } = useQuery(
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
      <SecondaryHeading text='My Orders' as='h2' />
      {isError && (
        <Alert status='error' title='Oops!' description='Server error' />
      )}
      {orders.length ? (
        <OrderTable {...{ orders }} />
      ) : (
        <>
          <Divider />
          <Subtitle text='You do not have any orders yet.' />
        </>
      )}
    </Stack>
  )

  return isLoading ? (
    <Loader />
  ) : (
    <ContentSidebar
      content={<Content />}
      contentW='35%'
      maxContentW={['100%', '70%']}
      sidebar={<Sidebar />}
      sidebarW='65%'
    />
  )
}

export default withRouter(Profile)
