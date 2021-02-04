import { Stack } from '@chakra-ui/react'
import { requestAllUsers } from 'api'
import { Alert } from 'components/Shared/Feedback'
import { PrimaryHeading } from 'components/Shared/Typography'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { UserTable } from './components'

const Users = () => {
  const auth = useSelector(state => state.auth)
  const { token } = auth.user

  const { data: users, isLoading, isError, error } = useQuery(
    ['users', { token }],
    requestAllUsers,
    { retry: 3, refetchOnWindowFocus: false, enabled: !!token }
  )
  return isError ? (
    <Alert
      status='error'
      title='Oops!'
      description={error.response.data.message}
    />
  ) : (
    !isLoading && (
      <Stack>
        <PrimaryHeading text='Users' />

        {!isError && <UserTable {...{ users }} />}
      </Stack>
    )
  )
}

export default Users
