import { Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const NavButton = ({ icon, label, to }) => {
  return (
    <Button
      as={RouterLink}
      to={to}
      variant='link'
      rightIcon={icon}
      onMouseDown={(e) => e.preventDefault()}
      color='gray.50'
    >
      {label}
    </Button>
  )
}

export default NavButton
