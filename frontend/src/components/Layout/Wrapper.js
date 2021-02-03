import { Container, Flex } from '@chakra-ui/react'

const MainWrapper = ({ children }) => (
  <Flex flex='1 1 0%' as='main' pt={6}>
    <Container maxW='5xl'>{children}</Container>
  </Flex>
)

export default MainWrapper
