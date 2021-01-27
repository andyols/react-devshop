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
    ...rest
  } = props
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel fontSize={size && size}>{label}</FormLabel>
      <InputGroup size={size && size}>
        {leftAddon && <InputLeftAddon children={leftAddon} />}
        {leftElement && (
          <InputLeftElement pointerEvents='none' children={leftElement} />
        )}
        <Input
          ref={ref}
          name={name || id}
          label={id}
          type={type || id}
          defaultValue={value || ''}
          {...rest}
        />
        {rightAddon && <InputRightAddon children={rightAddon} />}
        {rightElement && (
          <InputRightElement pointerEvents='none' children={rightElement} />
        )}
      </InputGroup>
      {help && <FormHelperText>{help}</FormHelperText>}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
})

export default FormInput
