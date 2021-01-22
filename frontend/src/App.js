import { ChakraProvider, theme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home, Product, Cart } from './screens'

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </ChakraProvider>
    </Router>
  )
}

export default App
