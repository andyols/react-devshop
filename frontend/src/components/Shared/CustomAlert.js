import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const CustomAlert = ({ status, title, description, to }) => {
  return (
    <Alert
      as={to ? RouterLink : Alert}
      to={to && to}
      status={status}
      borderRadius='base'
    >
      <AlertIcon />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

export default CustomAlert
