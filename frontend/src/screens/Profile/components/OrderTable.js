import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { NavButton } from 'components/Shared/Buttons'

const OrderTable = ({ orders }) => {
  return (
    <Table size='sm'>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Total</Th>
          <Th>Paid</Th>
          <Th>Delivered</Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {orders.map((order) => (
          <Tr key={order._id}>
            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
            <Td>${order.totalPrice}</Td>
            <Td>
              <Badge colorScheme={order.isPaid ? 'green' : 'red'}>
                {order.isPaid
                  ? new Date(order.paidAt).toLocaleDateString()
                  : 'not paid'}
              </Badge>
            </Td>
            <Td>
              <Badge colorScheme={order.isDelivered ? 'green' : 'orange'}>
                {order.isDelivered
                  ? new Date(order.deliveredAt).toLocaleDateString()
                  : 'in transit'}
              </Badge>
            </Td>
            <Td>
              <NavButton
                to={`/order/${order._id}`}
                label='Details'
                color='blue.500'
                size='sm'
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default OrderTable
