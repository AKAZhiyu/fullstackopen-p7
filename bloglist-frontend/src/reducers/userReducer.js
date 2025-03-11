import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
