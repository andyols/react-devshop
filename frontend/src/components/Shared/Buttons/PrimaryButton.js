import { Button } from '@chakra-ui/react'

const PrimaryButton = ({
  label,
  type,
  onClick,
  loading,
  disabled,
  leftIcon,
  rightIcon,
  colorScheme,
  ...rest
}) => {
  return (
    <Button
      colorScheme={colorScheme ? colorScheme : 'purple'}
      type={type && type}
      onClick={onClick && onClick}
      isLoading={loading && loading}
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

export default PrimaryButton
