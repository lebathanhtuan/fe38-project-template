import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  isShowAdminSidebar: false,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setTheme: () => {
      // do something
    },
    toggleAdminSidebar: (state, action) => {
      console.log('🚀 ~ file: common.slice.js:24 ~ action:', action)
      // action:
      // {
      //   type:
      //   payload:
      // }
      state.isShowAdminSidebar = action.payload
    },
  },
})

const type = 'common/toggleAdminSidebar'

export const { setTheme } = commonSlice.actions

export default commonSlice.reducer
