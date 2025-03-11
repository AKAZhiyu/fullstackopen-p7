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
    logOut(state, action) {
      return null
    },
  },
})

export const { setUser, logOut } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password)
  }
}

export default userSlice.reducer
