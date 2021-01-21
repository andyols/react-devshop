import { Container, Stack } from '@chakra-ui/react'

const MainWrapper = ({ children }) => (
  <Stack flex='1 1 0%' as='main'>
    <Container maxW='5xl'>{children}</Container>
  </Stack>
)

export default MainWrapper
