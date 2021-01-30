import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shipping: {},
  payment: {}
}

const fromLocalStorage = localStorage.getItem('checkout')
  ? JSON.parse(localStorage.getItem('checkout'))
  : initialState

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: fromLocalStorage,
  reducers: {
    save(state, action) {
      switch (action.payload.type) {
        case 'shipping':
          state.shipping = action.payload.data
          break
        case 'payment':
          state.payment = action.payload.data
          break
        default:
          state = action.payload
      }

      localStorage.setItem('checkout', JSON.stringify(state))
    },

    cancel(state, action) {
      state.shipping = {}
      localStorage.removeItem('checkout')
    }
  }
})

export const checkoutReducer = checkoutSlice.reducer
export const { save, cancel } = checkoutSlice.actions
