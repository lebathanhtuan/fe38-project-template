import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  isShowAdminSidebar: true,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setTheme: () => {
      // do something
    },
    toggleAdminSidebar: (state, action) => {
      state.isShowAdminSidebar = action.payload
    },
  },
})

export const { setTheme, toggleAdminSidebar } = commonSlice.actions

export default commonSlice.reducer
