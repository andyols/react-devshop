import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  success: false,
  toast: '',
  id: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true
    },
    success(state, action) {
      state.id = action.payload
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
    const orderId = await request(data, token)
    dispatch(success(orderId))
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message

    dispatch(failure(message))
  }
}

export const orderReducer = orderSlice.reducer
