import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)),
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      dispatch(setInfoMessage(`Logged in as ${username}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      dispatch(setErrorMessage('wrong credentials'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const handleCreate = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    console.log('creating blog')
    try {
      const savedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(savedBlog))
      dispatch(setInfoMessage('Blog created'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      if (exception.response) {
        dispatch(setErrorMessage(exception.response.data.error))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      } else {
        dispatch(setErrorMessage('something went wrong'))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    }
  }

  const handleUpdate = async (blogObj) => {
    try {
      const updatedBlog = await blogService.update(blogObj.id, blogObj)
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return updatedBlog
          } else {
            return blog
          }
        }),
      )
      blogService
        .getAll()
        .then((blogs) =>
          setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)),
        )
      dispatch(setInfoMessage('Blog liked'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      if (exception.response) {
        dispatch(setErrorMessage(exception.response.data.error))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      } else {
        dispatch(setErrorMessage('something went wrong'))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    dispatch(setInfoMessage('Logged out'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} data-testid="login_form">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleDeleteBlog = async (blog) => {
    try {
      // blogService.deleteBlog(id)
      if (window.confirm(`remove blog ${blog.title} by ${blog.user.name}`)) {
        await blogService.deleteBlog(blog.id)

        setBlogs(blogs.filter((b) => blog.id !== b.id))

        dispatch(setInfoMessage('Blog deleted'))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    } catch (exception) {
      if (exception.response) {
        dispatch(setErrorMessage(exception.response.data.error))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      } else {
        dispatch(setErrorMessage('something went wrong'))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
    }
  }

  const blogFrom = () => {
    return blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={handleUpdate}
        displayRemove={blog.user && blog.user.username === user.username}
        deleteBlog={handleDeleteBlog}
      />
    ))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
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
      <Togglable buttonLabel={'Create a blog'} ref={blogFormRef}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      {blogFrom()}
    </div>
  )
}

export default App
