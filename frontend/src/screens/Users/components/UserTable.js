import {
  ButtonGroup,
  HStack,
  Icon,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import { requestDeleteUser } from 'api'
import { SecondaryButton } from 'components/Shared/Buttons'
import { FiCheck, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const UserTable = ({ users }) => {
  // router
  const history = useHistory()

  // redux
  const token = useSelector((state) => state.auth.user.token)

  // react-query
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(requestDeleteUser)
  const handleDelete = async (id) => {
    await mutateAsync({ token, id })
    queryClient.invalidateQueries('users')
  }

  // color mode styles
  const deleteBorderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Table size='sm'>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Admin</Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {users.map((user) => (
          <Tr key={user._id}>
            <Td>{user._id}</Td>
            <Td>{user.name}</Td>
            <Td>
              <Link href={`mailTo:${user.email}`} color='blue.500'>
                {user.email}
              </Link>
            </Td>
            <Td>
              {user.isAdmin ? (
                <Icon as={FiCheck} color='green.500' />
              ) : (
                <Icon as={FiX} color='red.500' />
              )}
            </Td>
            <Td>
              <HStack>
                <ButtonGroup size='sm' isAttached>
                  <SecondaryButton
                    leftIcon={<FiEdit />}
                    label='Edit'
                    onClick={() => history.push(`/users/${user._id}/edit`)}
                  />
                  <SecondaryButton
                    rightIcon={<FiTrash />}
                    colorScheme='red'
                    variant='outline'
                    borderColor={deleteBorderColor}
                    isLoading={isLoading}
                    onClick={() => handleDelete(user._id)}
                  />
                </ButtonGroup>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default UserTable
