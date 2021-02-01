import { Button } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const NavButton = forwardRef((props, ref) => {
  const { leftIcon, rightIcon, label, to, ...rest } = props
  return (
    <Button
      ref={ref}
      as={to && RouterLink}
      to={to && to}
      variant='link'
      leftIcon={leftIcon && leftIcon}
      rightIcon={rightIcon && rightIcon}
      color='gray.50'
      _focus={{ outline: 0, textDecor: 'underline' }}
      {...rest}
    >
      {label}
    </Button>
  )
})

export default NavButton
