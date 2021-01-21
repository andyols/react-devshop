import {
  ChakraProvider,
  Heading,
  Stack,
  Text,
  theme,
  useColorModeValue
} from '@chakra-ui/react'
import { Layout } from './components/Layout'
import { Home } from './screens'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Stack mt={3}>
          <Heading size='lg'>Welcome to dev-shop</Heading>
          <Text color={useColorModeValue('gray.300', 'gray.500')}>
            Browse the latest and greatest tech and gear to make you the best
            developer you can be.
          </Text>
          <Home />
        </Stack>
      </Layout>
    </ChakraProvider>
  )
}

export default App
