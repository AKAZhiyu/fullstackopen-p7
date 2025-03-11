import { useParams } from 'react-router-dom'
import { Card, ListGroup, Container, Badge } from 'react-bootstrap'

const UserDetails = ({ users }) => {
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  const hasBlogs = user.blogs && user.blogs.length > 0

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title as="h2" className="mb-3">
            {user.name}
            <Badge bg="info" className="ms-2">
              {user.blogs?.length || 0} blogs
            </Badge>
          </Card.Title>

          <Card.Subtitle as="h3" className="mb-3">
            Added Blogs
          </Card.Subtitle>

          {hasBlogs ? (
            <ListGroup variant="flush">
              {user.blogs.map((blog) => (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Card.Text className="text-muted">No added blogs</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default UserDetails
