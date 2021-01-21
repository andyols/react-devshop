import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home, Product } from './screens'

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={Product} />
        </Layout>
      </ChakraProvider>
    </Router>
  )
}

export default App
