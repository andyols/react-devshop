import { ChakraProvider, theme } from '@chakra-ui/react'
import { Layout } from 'components/Layout'
import PrivateRoute from 'PrivateRoute'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Cart, Home, Login, Product, Profile, Register } from './screens'

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart' component={Cart} />
        </Layout>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  )
}

export default App
