import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  success: false,
  toast: '',
  current: {}
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true
    },
    success(state, action) {
      state.current = action.payload
      state.error = null
      state.loading = false
      state.toast = ''
      state.success = true
    },
    failure(state, action) {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const orderRequest = (request, data, token) => async (dispatch) => {
  const { loading, success, failure } = orderSlice.actions

  dispatch(loading())
  try {
    const order = await request(data, token)
    dispatch(success(order))
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message

    dispatch(failure(message))
  }
}

export const orderReducer = orderSlice.reducer
