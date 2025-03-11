import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Container, Badge } from 'react-bootstrap'

const UserList = () => {
  const userList = useSelector((state) => state.userList)

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Users</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>
              Blogs Created{' '}
              <Badge bg="secondary">{userList.length} users</Badge>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="text-primary text-decoration-none"
                >
                  {user.name}
                </Link>
              </td>
              <td>
                <Badge bg="primary">{user.blogs.length}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default UserList
