import { createSlice } from '@reduxjs/toolkit'
import { clear } from './cartSlice'
import { reset } from './checkoutSlice'

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
    cleanup(state) {
      state.error = null
      state.loading = false
      state.toast = ''
    },
    failure(state, action) {
      state.error = action.payload
      state.loading = false
    },
    login(state, action) {
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
      state.toast = `Welcome, ${user.name}`
    },
    logout(state) {
      localStorage.removeItem('user')
      state.user = {}
      state.toast = 'Have a nice day!'
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
    }
  }
})

// async actions to handle login / register requests
export const authRequest = (request, data, token) => async (dispatch) => {
  const { loading, cleanup, failure, login, update } = authSlice.actions

  dispatch(loading())
  try {
    const user = token ? await request(data, token) : await request(data)

    token ? dispatch(update(user)) : dispatch(login(user))
    dispatch(cleanup())
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message

    dispatch(failure(message))
  }
}

export const verifyPassword = (request, data) => async (dispatch) => {
  const { loading, cleanup, failure, verify } = authSlice.actions

  dispatch(loading())
  try {
    await request(data, data.token)
    dispatch(verify())
    dispatch(cleanup())
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message
    dispatch(failure(message))
  }
}

export const logoutRequest = () => async (dispatch) => {
  const { loading, cleanup, logout } = authSlice.actions
  dispatch(loading())
  // simulate network request for ui purposes
  setTimeout(() => {
    dispatch(clear())
    dispatch(reset())
    dispatch(logout())
    dispatch(cleanup())
  }, 500)
}

export const authReducer = authSlice.reducer
