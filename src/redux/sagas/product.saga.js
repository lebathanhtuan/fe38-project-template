import { debounce, takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import {
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
} from '../slicers/product.slice'

function* getProductListSaga(action) {
  try {
    const { categoryId, typeId, priceOrder, keyword, page, limit, more } = action.payload
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        categoryId: categoryId,
        typeId: typeId,
        ...(priceOrder && {
          _sort: 'price',
          _order: priceOrder,
        }),
        ...(keyword && {
          q: keyword,
        }),
        _page: page,
        _limit: limit,
        _expand: ['category', 'type'],
        isDelete: false,
      },
    })
    yield put(
      getProductListSuccess({
        data: result.data,
        meta: {
          total: parseInt(result.headers['x-total-count']),
          page: page,
          limit: limit,
        },
        more: more,
      })
    )
  } catch (e) {
    yield put(getProductListFail({ error: 'Lỗi...' }))
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: ['category', 'type'],
        _embed: 'favorites',
      },
    })
    yield put(getProductDetailSuccess({ data: result.data }))
  } catch (e) {
    yield put(getProductDetailFail({ error: 'Lỗi...' }))
  }
}

function* createProductSaga(action) {
  try {
    const { data, images, callback } = action.payload
    const result = yield axios.post('http://localhost:4000/products', data)
    for (let i = 0; i < images.length; i++) {
      yield axios.post('http://localhost:4000/images', {
        ...images[i],
        productId: result.data.id,
      })
    }
    yield callback()
    yield put(createProductSuccess({ data: result.data }))
  } catch (e) {
    yield put(createProductFail({ error: 'Lỗi...' }))
  }
}

function* updateProductSaga(action) {
  try {
    const { id, data, images, initialImageIds, callback } = action.payload
    const result = yield axios.patch(`http://localhost:4000/products/${id}`, data)
    for (let i = 0; i < images.length; i++) {
      if (!images[i].id) {
        yield axios.post('http://localhost:4000/images', {
          ...images[i],
          productId: result.data.id,
        })
      }
    }
    for (let j = 0; j < initialImageIds.length; j++) {
      const keepImage = images.find((item) => item.id && item.id === initialImageIds[j])
      if (!keepImage) {
        yield axios.delete(`http://localhost:4000/images/${initialImageIds[j]}`)
      }
    }
    yield callback()
    yield put(updateProductSuccess({ data: result.data }))
  } catch (e) {
    yield put(updateProductFail({ error: 'Lỗi...' }))
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.patch(`http://localhost:4000/products/${id}`, {
      isDelete: true,
    })
    yield put(deleteProductSuccess({ data: result.data }))
  } catch (e) {
    yield put(deleteProductFail({ error: 'Lỗi...' }))
  }
}

export default function* productSaga() {
  yield debounce(300, getProductListRequest, getProductListSaga)
  yield takeEvery(getProductDetailRequest, getProductDetailSaga)
  yield takeEvery(createProductRequest, createProductSaga)
  yield takeEvery(updateProductRequest, updateProductSaga)
  yield takeEvery(deleteProductRequest, deleteProductSaga)
}
