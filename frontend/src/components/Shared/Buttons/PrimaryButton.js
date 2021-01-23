import { Button, useColorModeValue } from '@chakra-ui/react'

const PrimaryButton = ({
  label,
  onClick,
  disabled,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const colorScheme = useColorModeValue('purple', 'cyan')
  return (
    <Button
      colorScheme={colorScheme}
      disabled={disabled && disabled}
      onClick={onClick && onClick}
      leftIcon={leftIcon && leftIcon}
      rightIcon={rightIcon && rightIcon}
      {...rest}
    >
      {label}
    </Button>
  )
}

export default PrimaryButton
