import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
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
import BlogDetails from './components/BlogDetails'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.userList)
  const blogs = useSelector((state) => state.blogs)
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

  const padding = {
    padding: 5,
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
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em>{user.username} logged in</em>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <UserList />
              <Togglable buttonLabel={'Create a blog'} ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <Blogs />
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div>
              <UserList />
            </div>
          }
        />
        <Route
          path="/users/:id"
          element={
            <div>
              <UserDetails users={users} />
            </div>
          }
        />
        <Route
          path="/blogs"
          element={
            <div>
              <Blogs />
            </div>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <div>
              <BlogDetails blogs={blogs} />
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
