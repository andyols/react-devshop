import { createSlice } from '@reduxjs/toolkit'
import {
  requestUpdateUserProfile,
  requestUserLogin,
  requestUserRegister
} from 'api'

const fromLocalStorage = localStorage.getItem('user')
  ? { user: JSON.parse(localStorage.getItem('user')) }
  : { user: {} }

const authSlice = createSlice({
  name: 'auth',
  initialState: { ...fromLocalStorage, loading: false, error: null },
  reducers: {
    authLoading(state, action) {
      state.loading = true
    },
    authSuccess(state, action) {
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
      state.error = null
      state.loading = false
    },
    authFailure(state, action) {
      state.error = action.payload
      state.loading = false
    },
    logoutSuccess(state, action) {
      localStorage.removeItem('user')
      state.user = {}
      state.loading = false
    }
  }
})

// async action to handle login / register requests
export const authRequest = (data) => async (dispatch) => {
  const { authSuccess, authLoading, authFailure } = authSlice.actions

  dispatch(authLoading())
  try {
    let user
    switch (data.type) {
      case 'login':
        user = await requestUserLogin(data)
        break
      case 'register':
        user = await requestUserRegister(data)
        break
      default:
        user = await requestUpdateUserProfile(data)
    }
    dispatch(authSuccess(user))
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(authFailure(message))
  }
}

export const logoutRequest = () => async (dispatch) => {
  const { logoutSuccess, authLoading } = authSlice.actions
  dispatch(authLoading())
  setTimeout(() => dispatch(logoutSuccess()), 500)
}

export const authReducer = authSlice.reducer
