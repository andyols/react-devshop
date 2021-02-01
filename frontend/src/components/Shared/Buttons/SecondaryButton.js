import { Button } from '@chakra-ui/react'

const SecondaryButton = ({
  label,
  type,
  onClick,
  disabled,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  return (
    <Button
      type={type && type}
      onClick={onClick && onClick}
      disabled={disabled && disabled}
      leftIcon={leftIcon && leftIcon}
      rightIcon={rightIcon && rightIcon}
      lineHeight={0}
      {...rest}
    >
      {label}
    </Button>
  )
}

export default SecondaryButton
