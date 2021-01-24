import { createSlice } from '@reduxjs/toolkit'

const fromLocalStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const cartSlice = createSlice({
  name: 'cart',
  initialState: fromLocalStorage,
  reducers: {
    addItem(state, action) {
      // construct data for a cart item
      const { _id, name, image, price, stockCount, qty } = action.payload
      const itemToAdd = { _id, name, image, price, stockCount, qty }

      // look to see if item exists in state array
      const itemInCart = state.find((item) => item._id === itemToAdd._id)

      if (itemInCart) {
        // if item already in cart, update it with any new data
        const updatedCart = state.map((item) =>
          item._id === itemInCart._id ? itemToAdd : item
        )
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return updatedCart
      } else {
        // else, just add the new item to state array
        state.push(itemToAdd)
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },

    removeItem(state, action) {
      const id = action.payload
      const updatedCart = state.filter((item) => item._id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    }
  }
})

export const cartReducer = cartSlice.reducer
export const { addItem, removeItem } = cartSlice.actions
