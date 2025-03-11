import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserDetails from './components/UserDetails'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, clearUser } from './reducers/userReducer'
import UserList from './components/UserList'
import { initializeUserList } from './reducers/userListReducer'
import { Routes, Route } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import NaviBar from './components/NaviBar'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.userList)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  if (user === null) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <h2 className="text-center mb-4">Log in to Blog App</h2>
            <Notification />
            <LoginForm />
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <div>
      <NaviBar />
      <Container className="mt-4">
        <Notification />
        <h2 className="mb-4">Blog App</h2>
        <Routes>
          <Route
            path="/"
            element={
              <Row>
                <Col md={4}>
                  <UserList />
                  <Togglable buttonLabel={'Create a blog'} ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                </Col>
                <Col md={8}>
                  <Blogs />
                </Col>
              </Row>
            }
          />
          <Route
            path="/users"
            element={
              <Row>
                <Col>
                  <UserList />
                </Col>
              </Row>
            }
          />
          <Route
            path="/users/:id"
            element={
              <Row>
                <Col>
                  <UserDetails users={users} />
                </Col>
              </Row>
            }
          />
          <Route
            path="/blogs"
            element={
              <Row>
                <Col>
                  <Blogs />
                </Col>
              </Row>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Row>
                <Col>
                  <BlogDetails blogs={blogs} />
                </Col>
              </Row>
            }
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
