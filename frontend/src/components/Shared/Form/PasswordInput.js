import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'

const PasswordInput = forwardRef((props, ref) => {
  const {
    id,
    label,
    name,
    show,
    size,
    error,
    help,
    handleClick,
    disabled
  } = props
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel fontSize={size && size}>{label}</FormLabel>
      <InputGroup size='md'>
        <Input
          id={id}
          name={name || id}
          ref={ref}
          pr='4.5rem'
          label='Old Password'
          type={show ? 'text' : 'password'}
          disabled={disabled && disabled}
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={handleClick}
            disabled={disabled && disabled}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      {help && <FormHelperText>{help}</FormHelperText>}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
})

export default PasswordInput
