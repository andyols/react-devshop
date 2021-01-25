import { ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from 'store'
import App from './App'

const client = new QueryClient()

ReactDOM.render(
  <QueryClientProvider {...{ client }}>
    <Provider {...{ store }}>
      <ColorModeScript />
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
)
