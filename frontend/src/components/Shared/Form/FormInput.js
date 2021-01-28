import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement
} from '@chakra-ui/react'
import { forwardRef } from 'react'

const FormInput = forwardRef((props, ref) => {
  const {
    value,
    type,
    name,
    id,
    label,
    error,
    help,
    size,
    leftAddon,
    leftElement,
    rightAddon,
    rightElement,
    disabled,
    ...rest
  } = props
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel fontSize={size && size}>{label}</FormLabel>
      <InputGroup size={size && size}>
        {leftAddon && <InputLeftAddon children={leftAddon} />}
        {leftElement && <InputLeftElement children={leftElement} />}
        <Input
          ref={ref}
          name={name || id}
          type={type || id}
          defaultValue={value || ''}
          disabled={disabled && disabled}
          {...rest}
        />
        {rightAddon && <InputRightAddon children={rightAddon} />}
        {rightElement && <InputRightElement children={rightElement} />}
      </InputGroup>
      {help && <FormHelperText>{help}</FormHelperText>}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
})

export default FormInput
