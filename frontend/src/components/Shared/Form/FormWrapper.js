import { Stack } from '@chakra-ui/react'

const Wrapper = ({ onSubmit, children }) => {
  return (
    <form noValidate {...{ onSubmit }}>
      <Stack spacing={3}>{children}</Stack>
    </form>
  )
}

export default Wrapper
