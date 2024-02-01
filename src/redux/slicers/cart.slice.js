import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { id, quantity } = action.payload
      const existProductIndex = state.cartList.findIndex((item) => item.id === id)
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity =
          state.cartList[existProductIndex].quantity + quantity
      } else {
        state.cartList.push(action.payload)
      }
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
  },
})

export const { addToCartRequest } = cartSlice.actions

export default cartSlice.reducer
