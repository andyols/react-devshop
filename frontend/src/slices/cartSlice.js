import { createSlice } from '@reduxjs/toolkit'

const initStateFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const cartSlice = createSlice({
  name: 'cart',
  initialState: initStateFromStorage,
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const itemFound = state.find((_) => _.product === item.product)

      if (itemFound) {
        return state
      } else {
        console.log('adding item to cart')
        state.push(item)
      }

      localStorage.setItem('cartItems', JSON.stringify(state))
    },

    removeItem(state, action) {
      const id = action.payload
      return state.filter((item) => item.id !== id)
    }
  }
})

export const cartReducer = cartSlice.reducer
export const { addItem, removeItem } = cartSlice.actions
