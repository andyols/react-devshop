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
  Tr
} from '@chakra-ui/react'
import { SecondaryButton } from 'components/Shared/Buttons'
import { FiCheck, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

const UserTable = ({ users }) => {
  // router
  const history = useHistory()

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
                    onClick={() => history.push(`/users/${user._id}/edit`)}
                    leftIcon={<FiEdit />}
                    label='Edit'
                  />
                  <SecondaryButton rightIcon={<FiTrash />} colorScheme='red' />
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
