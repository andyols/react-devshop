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
    saveShipping(state, action) {
      state.shipping = action.payload
      localStorage.setItem('checkout', JSON.stringify(state))
    },
    savePayment(state, action) {
      state.payment = action.payload
      localStorage.setItem('checkout', JSON.stringify(state))
    },
    clearCheckout(state) {
      state.shipping = {}
      state.payment = ''
      localStorage.removeItem('checkout')
    }
  }
})

export const checkoutReducer = checkoutSlice.reducer
export const {
  saveShipping,
  savePayment,
  clearCheckout
} = checkoutSlice.actions
