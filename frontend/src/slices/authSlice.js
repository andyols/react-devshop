import { createSlice } from '@reduxjs/toolkit'
import { clearCart } from './cartSlice'
import { clearCheckout } from './checkoutSlice'

const initialState = {
  loading: false,
  error: null,
  verified: false,
  toast: ''
}

const fromLocalStorage = {
  ...initialState,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState: fromLocalStorage,
  reducers: {
    loading(state) {
      state.loading = true
    },
    success(state) {
      state.error = null
      state.loading = false
      state.toast = ''
    },
    failure(state, action) {
      state.error = action.payload
      state.loading = false
    },
    update(state, action) {
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
      state.verified = false
      state.toast = 'Profile Updated'
    },
    verify(state) {
      state.user.verified = true
    },
    logout(state) {
      localStorage.removeItem('user')
      state.user = {}
    }
  }
})

// async actions to handle login / register requests
export const authRequest = (request, data, token) => async (dispatch) => {
  const { loading, success, failure, update } = authSlice.actions

  dispatch(loading())
  try {
    const user = token ? await request(data, token) : await request(data)

    dispatch(update(user))
    dispatch(success())
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message

    dispatch(failure(message))
  }
}

export const verifyPassword = (request, data) => async (dispatch) => {
  const { loading, success, failure, verify } = authSlice.actions

  dispatch(loading())
  try {
    await request(data, data.token)
    dispatch(verify())
    dispatch(success())
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message
    dispatch(failure(message))
  }
}

export const logoutRequest = () => async (dispatch) => {
  const { loading, success, logout } = authSlice.actions
  dispatch(loading())
  // simulate network request for ui purposes
  setTimeout(() => {
    dispatch(clearCart())
    dispatch(clearCheckout())
    dispatch(logout())
    dispatch(success())
  }, 500)
}

export const authReducer = authSlice.reducer
