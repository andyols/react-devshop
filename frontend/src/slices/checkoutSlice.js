import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shipping: {},
  payment: ''
}

const fromLocalStorage = localStorage.getItem('checkout')
  ? JSON.parse(localStorage.getItem('checkout'))
  : initialState

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: fromLocalStorage,
  reducers: {
    save(state, action) {
      action.payload.type === 'shipping'
        ? (state.shipping = action.payload)
        : (state.payment = action.payload)

      localStorage.setItem('checkout', JSON.stringify(state))
    },
    reset(state) {
      state.shipping = {}
      state.payment = ''
      localStorage.removeItem('checkout')
    }
  }
})

export const checkoutReducer = checkoutSlice.reducer
export const { save, reset } = checkoutSlice.actions
