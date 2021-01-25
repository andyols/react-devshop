import { Button } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

const GoBackButton = ({ to }) => {
  return (
    <Button as={RouterLink} to={to} leftIcon={<FiArrowLeft />} variant='ghost'>
      Go Back
    </Button>
  )
}

export default GoBackButton
