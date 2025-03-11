import { useParams } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const id = useParams().id
  const user = users.find((u) => u.id === id)
  if (!user) {
    return null
  }
  const hasBlogs = user.blogs && user.blogs.length > 0
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {hasBlogs
          ? user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
          : 'No added blogs'}
      </ul>
    </div>
  )
}

export default UserDetails
