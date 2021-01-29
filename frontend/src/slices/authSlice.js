import { createSlice } from '@reduxjs/toolkit'
import { empty } from './cartSlice'

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
    updateUser(state, action) {
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
      state.verified = false
      state.toast = 'Profile Updated'
    },
    verifyUser(state) {
      state.user.verified = true
    },
    logoutUser(state) {
      localStorage.removeItem('user')
      state.user = {}
    }
  }
})

// async actions to handle login / register requests
export const authRequest = (request, data) => async (dispatch) => {
  const { loading, success, failure, updateUser } = authSlice.actions

  dispatch(loading())
  try {
    const user = data.token
      ? await request(data, data.token)
      : await request(data)

    dispatch(updateUser(user))
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
  const { loading, success, failure, verifyUser } = authSlice.actions

  dispatch(loading())
  try {
    await request(data, data.token)
    dispatch(verifyUser())
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
  const { loading, success, logoutUser } = authSlice.actions
  dispatch(loading())
  // simulate network request for ui purposes
  setTimeout(() => {
    dispatch(empty())
    dispatch(logoutUser())
    dispatch(success())
  }, 500)
}

export const authReducer = authSlice.reducer
