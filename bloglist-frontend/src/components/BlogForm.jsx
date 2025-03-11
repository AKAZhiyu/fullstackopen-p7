import { useState } from 'react'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { Form, Button, Card, Container } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
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
      blogFormRef.current.toggleVisibility()
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
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title as="h2" className="mb-4">
            Create New Blog
          </Card.Title>
          <Form onSubmit={addBlog}>
            <Form.Group className="mb-3" controlId="formBlogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newBlogTitle}
                name="Title"
                onChange={({ target }) => setNewBlogTitle(target.value)}
                placeholder="Enter title here..."
                data-testid="title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBlogAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={newBlogAuthor}
                name="Author"
                onChange={({ target }) => setNewBlogAuthor(target.value)}
                placeholder="Enter author here..."
                data-testid="author"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBlogUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={newBlogUrl}
                name="Url"
                onChange={({ target }) => setNewBlogUrl(target.value)}
                placeholder="Enter URL here..."
                data-testid="url"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default BlogForm
