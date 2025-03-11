import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer'
import { useState } from 'react'
import {
  Card,
  Button,
  Form,
  ListGroup,
  Container,
  Badge,
} from 'react-bootstrap'

const BlogDetails = ({ blogs }) => {
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.user)
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return (
      <Container className="mt-4">
        <Card>
          <Card.Body>Blog not found</Card.Body>
        </Card>
      </Container>
    )
  }

  const handleLike = () => {
    dispatch(likeBlog(id))
  }
  const displayRemove = blog.user && blog.user.username === user.username

  const removeBlog = () => {
    dispatch(deleteBlog(id))
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    if (comment.trim()) {
      dispatch(commentBlog(id, comment))
      setComment('')
    }
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title as="h2">{blog.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Added by {blog.author || 'Unknown'}
          </Card.Subtitle>
          <Card.Link href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </Card.Link>
          <Card.Text className="mt-3">
            <Badge bg="primary" className="me-2">
              {blog.likes} likes
            </Badge>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleLike}
              className="me-2"
            >
              Like
            </Button>
            {displayRemove && (
              <Button variant="outline-danger" size="sm" onClick={removeBlog}>
                Remove
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mt-4">
        <Card.Body>
          <Card.Title as="h3">Comments</Card.Title>
          <Form onSubmit={handleCommentSubmit} className="mb-3">
            <Form.Group className="d-flex gap-2">
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="me-2"
              />
              <Button variant="primary" type="submit">
                Add Comment
              </Button>
            </Form.Group>
          </Form>

          {blog.comments && blog.comments.length > 0 ? (
            <ListGroup variant="flush">
              {blog.comments.map((comment) => (
                <ListGroup.Item key={comment.id}>
                  {comment.content}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Card.Text className="text-muted">No Comments</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default BlogDetails
