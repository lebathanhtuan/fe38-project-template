import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { favoriteProductSuccess, unFavoriteProductSuccess } from './favorite.slice'

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
  createProductData: {
    loading: false,
    error: null,
  },
  updateProductData: {
    load: false,
    error: null,
  },
  deleteProductData: {
    load: false,
    error: null,
  },
}

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    // getProductList
    getProductListRequest: (state) => {
      state.productList.loading = true
      state.productList.error = null
    },
    getProductListSuccess: (state, action) => {
      const { data, meta, more } = action.payload
      state.productList.data = more ? [...state.productList.data, ...data] : data
      state.productList.meta = meta
      state.productList.loading = false
    },
    getProductListFail: (state, action) => {
      const { error } = action.payload
      state.productList.error = error
      state.productList.loading = false
    },

    // getProductDetail
    getProductDetailRequest: (state) => {
      state.productDetail.loading = true
      state.productDetail.error = null
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload
      state.productDetail.data = data
      state.productDetail.loading = false
    },
    getProductDetailFail: (state, action) => {
      const { error } = action.payload
      state.productDetail.error = error
      state.productDetail.loading = false
    },

    // createProduct
    createProductRequest: (state, action) => {
      state.createProductData.loading = true
      state.createProductData.error = null
    },
    createProductSuccess: (state, action) => {
      state.createProductData.loading = false
    },
    createProductFail: (state, action) => {
      state.createProductData.loading = false
      state.createProductData.error = action.payload.error
    },
    
    // updateProduct
    updateProductRequest: (state, action) => {
      state.updateProductData.loading = true
      state.createProductData.error = null
    },
    updateProductSuccess: (state, action) => {
      state.updateProductData.loading = false
    },
    updateProductFail: (state, action) => {
      state.updateProductData.loading = false
      state.updateProductData.error = action.payload.error
    },

    // deleteProduct
    deleteProductRequest: (state, action) => {
      state.deleteProductData.loading = true
      state.deleteProductData.error = null
    },
    deleteProductSuccess: (state, action) => {
      state.deleteProductData.loading = false
    },
    deleteProductFail: (state, action) => {
      state.deleteProductData.loading = false
      state.deleteProductData.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteProductSuccess, (state, action) => {
        const { data } = action.payload
        state.productDetail.data.favorites.push(data)
      })
      .addCase(unFavoriteProductSuccess, (state, action) => {
        const { id } = action.payload
        if (state.productDetail.data.favorites?.length) {
          state.productDetail.data.favorites = state.productDetail.data.favorites.filter(
            (item) => item.id !== id
          )
        }
      })
  },
})

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
  createProductRequest,
  createProductSuccess,
  createProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
} = productSlice.actions

export default productSlice.reducer
