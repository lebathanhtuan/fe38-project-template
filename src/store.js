import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import productReducer from './redux/slicers/product.slice'
import taskReducer from './redux/slicers/task.slice'
import commonReducer from './redux/slicers/common.slice'

import rootSaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    product: productReducer,
    task: taskReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
})

sagaMiddleware.run(rootSaga)

export default store
