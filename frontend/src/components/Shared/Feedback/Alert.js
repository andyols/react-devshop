import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Container
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const CustomAlert = ({ status, title, description, to, handleClose }) => {
  return (
    <Container maxW='xl'>
      <Alert
        status={status}
        borderRadius='base'
        variant='subtle'
        flexDirection={['column', 'row']}
      >
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
        {handleClose && <CloseButton onClick={handleClose} />}
      </Alert>
    </Container>
  )
}

export default CustomAlert
