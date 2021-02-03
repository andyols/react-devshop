import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Layout } from 'components/Layout'
import PrivateRoute from 'components/Router/PrivateRoute'
import { Toast } from 'components/Shared/Feedback'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  Cart,
  Checkout,
  Home,
  Login,
  Order,
  Product,
  Profile,
  Register
} from './screens'
import appTheme from './theme'

const theme = extendTheme({ appTheme })

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Layout>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/product/:id'>
            <Product />
          </Route>

          <Route path='/cart'>
            <Cart />
          </Route>

          <PrivateRoute path='/checkout'>
            <Checkout />
          </PrivateRoute>

          <PrivateRoute path='/order/:id'>
            <Order />
          </PrivateRoute>

          <PrivateRoute path='/profile'>
            <Profile />
          </PrivateRoute>

          <Toast />
        </Layout>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  )
}

export default App
