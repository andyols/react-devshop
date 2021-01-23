import { ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

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
