import { Stack } from '@chakra-ui/react'
import { Footer, Header, Wrapper } from '.'

const Layout = ({ children }) => {
  return (
    <Stack minH='100vh'>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Stack>
  )
}

export default Layout
