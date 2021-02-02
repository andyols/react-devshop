import { ColorModeScript } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from 'store'
import App from './App'

const client = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 600000, retry: 3, refetchOnWindowFocus: false }
  }
})

ReactDOM.render(
  <QueryClientProvider {...{ client }}>
    <Provider {...{ store }}>
      <ColorModeScript />
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
)
