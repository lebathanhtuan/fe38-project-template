import { configureStore } from '@reduxjs/toolkit'

import productReducer from './redux/slicers/product.slice'
import taskReducer from './redux/slicers/task.slice'
import commonReducer from './redux/slicers/common.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    task: taskReducer,
    common: commonReducer,
  },
})
