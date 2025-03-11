import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from '../reducers/notificationReducer'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleUpdate = async (id) => {
    try {
      await dispatch(likeBlog(id))
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

  const handleDeleteBlog = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id)
      // blogService.deleteBlog(id)
      if (window.confirm(`remove blog ${blog.title} by ${blog.user.name}`)) {
        await dispatch(deleteBlog(blog.id))

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

  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
}

export default Blogs
