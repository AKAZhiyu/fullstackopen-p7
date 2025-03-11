import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const BlogDetails = ({ blogs }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleLike = () => {
    dispatch(likeBlog(id))
  }

  return (
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes<button onClick={handleLike}>like</button>
      </div>
      <div>Added by {blog.author || 'Unknown'}</div>
    </div>
  )
}

export default BlogDetails
