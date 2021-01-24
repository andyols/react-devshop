import { createSlice } from '@reduxjs/toolkit'
import { requestUserLogin } from 'api'

const fromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {}

const userSlice = createSlice({
  name: 'user',
  initialState: fromLocalStorage,
  reducers: {
    loginSuccess(state, action) {
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      return user
    },
    loginLoading(state, action) {
      state.loading = true
    },
    loginFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    logout(state, action) {
      localStorage.removeItem('user')
      return {}
    }
  }
})

// async action to handle login request
export const login = (creds) => async (dispatch) => {
  const { loginSuccess, loginLoading, loginFail } = userSlice.actions
  dispatch(loginLoading())
  try {
    const user = await requestUserLogin(creds)
    dispatch(loginSuccess(user))
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch(loginFail(message))
  }
}

export const { logout } = userSlice.actions
export const userReducer = userSlice.reducer
