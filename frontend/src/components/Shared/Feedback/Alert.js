import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const CustomAlert = ({ status, title, description, to, handleClose }) => {
  return (
    <Alert
      status={status}
      borderRadius='base'
      d='flex'
      justifyContent='space-between'
    >
      <HStack spacing={0}>
        <AlertIcon />
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && (
          <AlertDescription
            _hover={to && { textDecor: 'underline' }}
            as={to ? RouterLink : AlertDescription}
            to={to && to}
          >
            {description}
          </AlertDescription>
        )}
      </HStack>
      {handleClose && <CloseButton onClick={handleClose} />}
    </Alert>
  )
}

export default CustomAlert
