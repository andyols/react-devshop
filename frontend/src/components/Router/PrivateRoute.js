import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ admin, children, ...rest }) => {
  const auth = useSelector(state => state.auth)
  return admin ? (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user.id && auth.user.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user._id ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
