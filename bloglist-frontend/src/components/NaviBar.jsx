import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from '../reducers/notificationReducer'
import { clearUser } from '../reducers/userReducer'

const NaviBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    dispatch(clearUser())
    dispatch(setInfoMessage('Logged out'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Blog App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className="px-3">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="px-3">
              Blogs
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="me-3">
              Welcome, <em>{user.username}</em>
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NaviBar
