import { createSlice } from '@reduxjs/toolkit'

const fromLocalStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const cartSlice = createSlice({
  name: 'cart',
  initialState: fromLocalStorage,
  reducers: {
    addItem(state, action) {
      const cartIndex = state.findIndex((i) => i._id === action.payload._id)

      cartIndex > -1
        ? (state[cartIndex].qty = action.payload.qty)
        : state.push(action.payload)

      localStorage.setItem('cart', JSON.stringify(state))
    },

    removeItem(state, action) {
      const cartIndex = state.findIndex((item) => item._id === action.payload)
      state.splice(cartIndex, 1)
      localStorage.setItem('cart', JSON.stringify(state))
    },

    clear(state) {
      state.length = 0
      localStorage.removeItem('cart')
    }
  }
})

export const cartReducer = cartSlice.reducer
export const { addItem, removeItem, clear } = cartSlice.actions
