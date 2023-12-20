import { configureStore } from '@reduxjs/toolkit'

import productReducer from './redux/slicers/product.slice'
import commonReducer from './redux/slicers/common.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    common: commonReducer,
  },
})
