import { Button } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const NavButton = forwardRef((props, ref) => {
  const { icon, label, to } = props
  return (
    <Button
      ref={ref}
      as={to && RouterLink}
      to={to && to}
      variant='link'
      rightIcon={icon}
      onMouseDown={(e) => e.preventDefault()}
      color='gray.50'
      _focus={{ outline: 0, textDecor: 'underline' }}
    >
      {label}
    </Button>
  )
})

export default NavButton
