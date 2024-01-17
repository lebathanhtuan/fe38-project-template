import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
} from '../slicers/product.slice'

function* getProductListSaga(action) {
  try {
    const { categoryId } = action.payload
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        categoryId: categoryId,
      },
    })
    yield put(getProductListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getProductListFail({ error: 'Lỗi...' }))
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`http://localhost:4000/products/${id}`)
    yield put(getProductDetailSuccess({ data: result.data }))
  } catch (e) {
    yield put(getProductDetailFail({ error: 'Lỗi...' }))
  }
}

export default function* productSaga() {
  yield takeEvery(getProductListRequest, getProductListSaga)
  yield takeEvery(getProductDetailRequest, getProductDetailSaga)
}
