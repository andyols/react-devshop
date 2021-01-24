import { createSlice } from '@reduxjs/toolkit'
import { requestUserLogin, requestUserRegister } from 'api'

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
      state.loading = false
      state.error = null
      state.user = user
    },
    authFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    logout(state, action) {
      localStorage.removeItem('user')
      state.user = {}
    }
  }
})

// async action to handle login / register requests
export const authRequest = (data) => async (dispatch) => {
  const { authSuccess, authLoading, authFailure } = authSlice.actions

  dispatch(authLoading())
  try {
    const user = data.name
      ? await requestUserRegister(data)
      : await requestUserLogin(data)
    dispatch(authSuccess(user))
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(authFailure(message))
  }
}

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
