import { useState } from 'react'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await dispatch(
        createBlog({
          author: newBlogAuthor,
          url: newBlogUrl,
          title: newBlogTitle,
        }),
      )
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
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return (
    <div className="blogForm">
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            placeholder="title here..."
            data-testid="title"
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            placeholder="author here..."
            data-testid="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            placeholder="url here..."
            data-testid="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
