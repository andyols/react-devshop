import { createSlice } from '@reduxjs/toolkit'

const initStateFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const cartSlice = createSlice({
  name: 'cart',
  initialState: initStateFromStorage,
  reducers: {
    addItem(state, action) {
      // construct data for a cart item
      const { _id, name, image, price, stockCount, qty } = action.payload
      const itemToAdd = { _id, name, image, price, stockCount, qty }

      // look to see if item exists in state array
      const itemFound = state.find((item) => item._id === itemToAdd._id)

      if (itemFound) {
        console.log('item found')
        // if item already in cart, update it with any new data
        const newCart = state.map((item) =>
          item._id === itemFound._id ? itemToAdd : item
        )
        localStorage.setItem('cartItems', JSON.stringify(newCart))
        return newCart
      } else {
        // else, just add the new item to state array
        state.push(itemToAdd)
        localStorage.setItem('cartItems', JSON.stringify(state))
      }
    },

    removeItem(state, action) {
      const id = action.payload
      const newCart = state.filter((item) => item._id !== id)
      localStorage.setItem('cartItems', JSON.stringify(newCart))
      return newCart
    }
  }
})

export const cartReducer = cartSlice.reducer
export const { addItem, removeItem } = cartSlice.actions
