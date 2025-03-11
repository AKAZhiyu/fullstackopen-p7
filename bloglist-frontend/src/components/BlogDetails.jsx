import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer'
import { useState } from 'react'

const BlogDetails = ({ blogs }) => {
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.user)
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <div>Blog not found</div>
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
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes<button onClick={handleLike}>like</button>
      </div>
      <div>Added by {blog.author || 'Unknown'}</div>
      {displayRemove && (
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.length > 0
          ? blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))
          : 'No Comments'}
      </ul>
    </div>
  )
}

export default BlogDetails
