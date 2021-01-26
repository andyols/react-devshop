import { Stack } from '@chakra-ui/react'

const Wrapper = ({ onSubmit, children, ...rest }) => {
  return (
    <form noValidate {...{ onSubmit }}>
      <Stack {...rest}>{children}</Stack>
    </form>
  )
}

export default Wrapper
