import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon
} from '@chakra-ui/react'
import { forwardRef } from 'react'

const FormInput = forwardRef((props, ref) => {
  const { name, id, label, error, help, addon } = props
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input ref={ref} name={name || id} label={id} type={id} />
        {addon && <InputRightAddon children={addon} />}
      </InputGroup>
      {help && <FormHelperText>{help}</FormHelperText>}
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
})

export default FormInput
