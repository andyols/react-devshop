import { ChakraProvider, theme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Cart, Home, Product } from './screens'

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
        </Layout>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  )
}

export default App
