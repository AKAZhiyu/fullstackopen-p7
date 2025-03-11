import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload
    },
    clearUserList(state, action) {
      return []
    },
  },
})

export const { setUserList, clearUserList } = userListSlice.actions

export const initializeUserList = () => {
  return async (dispatch) => {
    const usersList = await usersService.getAll()
    dispatch(setUserList(usersList))
  }
}

export default userListSlice.reducer
