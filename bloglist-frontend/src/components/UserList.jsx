import { useDispatch, useSelector } from 'react-redux'
import UserDetails from './UserDetails'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

const UserList = () => {
  const userList = useSelector((state) => state.userList)
  const match = useMatch('/users/:id')
  const detailedUser = match
    ? userList.find((usr) => usr.id === match.params.id)
    : null
  return (
    <div>
      <Routes>
        <Route
          path="/users/:id"
          element={<UserDetails user={detailedUser} />}
        />
        <Route
          path="/"
          element={
            <div>
              <h2>Users</h2>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>blogs created</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default UserList
