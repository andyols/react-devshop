import { createSlice } from '@reduxjs/toolkit'
import { clear } from './cartSlice'

const initialState = {
  loading: false,
  error: null,
  created: false,
  paid: false,
  id: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true
    },
    create(state, action) {
      state.id = action.payload
      state.error = null
      state.loading = false
      state.created = true
    },
    pay(state) {
      state.error = null
      state.loading = false
      state.paid = true
    },
    cleanup(state) {
      state.created = false
    },
    failure(state, action) {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const create = (request, data, token) => async (dispatch) => {
  const { loading, create, cleanup, failure } = orderSlice.actions

  dispatch(loading())
  try {
    const orderId = await request(data, token)
    await dispatch(create(orderId))
    dispatch(clear())
    dispatch(cleanup())
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message

    dispatch(failure(message))
  }
}
export const pay = (request, data, token) => async (dispatch) => {
  const { loading, pay, cleanup, failure } = orderSlice.actions

  dispatch(loading())
  try {
    await request(data, token)
    await dispatch(pay())
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message

    dispatch(failure(message))
  }
}

export const orderReducer = orderSlice.reducer
