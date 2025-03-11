import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.map((blog) => (
          <Col key={blog.id}>
            <Blog blog={blog} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Blogs
