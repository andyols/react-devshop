import { Stack } from '@chakra-ui/react'
import { Loader } from 'components/Shared/Feedback'
import { Footer, Header, Wrapper } from '.'

const Layout = ({ children }) => {
  return (
    <Stack minH='100vh' spacing={0}>
      <Header />
      <Loader />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Stack>
  )
}

export default Layout
