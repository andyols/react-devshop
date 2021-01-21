import { ChakraProvider, theme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home, Product } from './screens'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/product/:id' component={Product} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
