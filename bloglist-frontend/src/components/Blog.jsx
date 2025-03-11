import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <Card className="mb-3 shadow-sm blog" style={{ minWidth: '300px' }}>
      <Card.Body>
        <Card.Title as="h5">
          <Link
            to={`/blogs/${blog.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {blog.title}
          </Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default Blog
