import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], toast: '' }

const fromLocalStorage = localStorage.getItem('cart')
  ? { ...initialState, items: JSON.parse(localStorage.getItem('cart')) }
  : { items: [], toast: '' }

const cartSlice = createSlice({
  name: 'cart',
  initialState: fromLocalStorage,
  reducers: {
    add(state, action) {
      const cartIndex = state.items.findIndex(
        (i) => i._id === action.payload._id
      )

      if (cartIndex > -1) {
        // item found
        state.items[cartIndex].qty = action.payload.qty
        state.toast = 'Item updated'
      } else {
        state.items.push(action.payload)
        state.toast = 'Item added to cart'
      }

      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    remove(state, action) {
      const cartIndex = state.items.findIndex(
        (item) => item._id === action.payload
      )

      state.items.splice(cartIndex, 1)
      state.toast = 'Item removed from cart'

      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    success(state) {
      state.toast = ''
    },

    clearCart(state) {
      state.items.length = 0
      localStorage.removeItem('cart')
    }
  }
})

export const cartAction = (item) => async (dispatch) => {
  const { add, remove, success } = cartSlice.actions

  try {
    item.qty ? await dispatch(add(item)) : await dispatch(remove(item))
    dispatch(success())
  } catch (e) {
    console.error(e)
  }
}

export const cartReducer = cartSlice.reducer
export const { clearCart } = cartSlice.actions
