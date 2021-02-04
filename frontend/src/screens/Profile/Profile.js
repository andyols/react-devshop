import { Divider, Stack } from '@chakra-ui/react'
import { requestUserOrders } from 'api'
import {
  PasswordFormSwapper,
  UpdateProfileForm
} from 'components/Forms/Profile'
import { ContentSidebar } from 'components/Layout'
import { Alert } from 'components/Shared/Feedback'
import {
  PrimaryHeading,
  SecondaryHeading,
  Subtitle
} from 'components/Shared/Typography'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { OrderList } from './components'

const Profile = () => {
  const auth = useSelector(state => state.auth)
  const { token } = auth.user

  const { data: orders, isLoading, isError, error } = useQuery(
    ['orders', { token }],
    requestUserOrders,
    { retry: 3, refetchOnWindowFocus: false, enabled: !!token }
  )

  const Content = () => (
    <Stack w={['100%', '90%']}>
      <PrimaryHeading text={`Hello, ${auth.user.name.split(' ')[0]}`} />
      <Divider />
      <UpdateProfileForm />
      <PasswordFormSwapper />
    </Stack>
  )

  const Sidebar = () => (
    <Stack w='100%' mt={3}>
      <SecondaryHeading text='My Orders' as='h2' />
      {orders.length ? (
        <OrderList {...{ orders }} />
      ) : (
        <>
          <Divider />
          <Subtitle text='You do not have any orders yet.' />
        </>
      )}
    </Stack>
  )

  return isError ? (
    <Alert
      status='error'
      title='Oops!'
      description={error.response.data.message}
    />
  ) : (
    !isLoading && (
      <ContentSidebar
        content={<Content />}
        contentW='35%'
        maxContentW={['100%', '100%', '70%']}
        minContentW='30ch'
        sidebar={<Sidebar />}
        sidebarW='65%'
      />
    )
  )
}

export default Profile
