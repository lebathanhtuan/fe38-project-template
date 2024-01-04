import { fork } from 'redux-saga/effects'

import productSaga from './product.saga'

export default function* rootSaga() {
  yield fork(productSaga)
}
