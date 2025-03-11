import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
      state.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogToCreate) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogToCreate)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const deletedBlog = await blogService.deleteBlog(id)
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
    return deletedBlog
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToBeLiked = blogs.find((blog) => blog.id === id)
    const likedBlog = await blogService.update(id, {
      ...blogToBeLiked,
      likes: blogToBeLiked.likes + 1,
    })
    dispatch(setBlogs(blogs.map((blog) => (blog.id === id ? likedBlog : blog))))
    return likedBlog
  }
}

export default blogSlice.reducer
