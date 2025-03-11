import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, clearUser } from './reducers/userReducer'
import UserList from './components/UserList'
import { initializeUserList } from './reducers/userListReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUserList())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(savedUser))
      blogService.setToken(savedUser.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(setInfoMessage('Logged out'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.username} logged in{' '}
        <button onClick={handleLogout}>log out</button>
      </p>
      <UserList />
      <Togglable buttonLabel={'Create a blog'} ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default App
