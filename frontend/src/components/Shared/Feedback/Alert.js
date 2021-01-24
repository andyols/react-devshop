import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const CustomAlert = ({ status, title, description, to }) => {
  return (
    <Alert status={status} borderRadius='base'>
      <AlertIcon />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && (
        <AlertDescription
          _hover={{ textDecor: 'underline' }}
          as={to ? RouterLink : AlertDescription}
          to={to && to}
        >
          {description}
        </AlertDescription>
      )}
    </Alert>
  )
}

export default CustomAlert
