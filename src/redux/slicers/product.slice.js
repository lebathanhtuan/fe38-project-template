import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  productList: [
    {
      id: 1,
      name: 'iPhone 15',
      price: 22000000,
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 28000000,
    },
    {
      id: 3,
      name: 'iPhone 14 Pro',
      price: 24000000,
    },
    {
      id: 4,
      name: 'Samsung S23 Ultra',
      price: 24000000,
    },
  ],
  productDetail: {},
}

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    getProductList: () => {
      // do something
    },
    getProductDetail: () => {
      // do something
    },
    createProduct: (state, action) => {
      state.productList.push({
        id: uuidv4(),
        ...action.payload,
      })
    },
    updateProduct: () => {
      // do something
    },
    deleteProduct: () => {
      // do something
    },
  },
})

export const {
  getProductList,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions

export default productSlice.reducer
