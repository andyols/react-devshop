import { Button, useColorModeValue } from '@chakra-ui/react'

const PrimaryButton = ({
  label,
  type,
  onClick,
  loading,
  disabled,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const colorScheme = useColorModeValue('purple', 'cyan')
  return (
    <Button
      colorScheme={colorScheme}
      type={type && type}
      onClick={onClick && onClick}
      isLoading={loading && loading}
      disabled={disabled && disabled}
      leftIcon={leftIcon && leftIcon}
      rightIcon={rightIcon && rightIcon}
      {...rest}
    >
      {label}
    </Button>
  )
}

export default PrimaryButton
