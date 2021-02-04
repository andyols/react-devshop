import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'
import { PrimaryButton } from 'components/Shared/Buttons'
import { ItemList } from 'components/Shared/Lists'
import { FiArrowRightCircle } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

const OrderAccordion = ({ orders }) => {
  //router
  const history = useHistory()

  return (
    <Accordion defaultIndex={[0]} allowToggle>
      {orders.map(order => {
        // get order date
        const date = new Date(order.createdAt)

        // order status badge
        const fulfilled = order.isPaid && order.isDelivered
        const inTransit = order.isPaid && !order.isDelivered
        const badge = fulfilled
          ? { color: 'green', status: 'fulfilled' }
          : inTransit
          ? { color: 'orange', status: 'in transit' }
          : { color: 'red', status: 'payment required' }

        return (
          <AccordionItem key={order._id}>
            {({ isExpanded }) => (
              <>
                <Stack direction={['column', 'row']} align='flex-end'>
                  <AccordionButton d='flex' justifyContent='space-between'>
                    <HStack>
                      <Text>{date.toLocaleDateString()}</Text>
                      <Badge colorScheme={badge.color}>{badge.status}</Badge>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                  {isExpanded && (
                    <PrimaryButton
                      label='Details'
                      rightIcon={<FiArrowRightCircle />}
                      variant='ghost'
                      onClick={() => history.push(`/order/${order._id}`)}
                    />
                  )}
                </Stack>
                <AccordionPanel>
                  <Stack>
                    <ItemList items={order.orderItems} />
                  </Stack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default OrderAccordion
