import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from 'slices/authSlice'
import { cartReducer } from 'slices/cartSlice'
import { checkoutReducer } from 'slices/checkoutSlice'
import { orderReducer } from 'slices/orderSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer
  }
})

export default store
