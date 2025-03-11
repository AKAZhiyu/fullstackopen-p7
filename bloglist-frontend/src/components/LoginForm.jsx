import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {
  clearNotification,
  setError as setErrorMessage,
  setInfo as setInfoMessage,
} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      dispatch(setInfoMessage(`Logged in as ${username}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      dispatch(setErrorMessage('wrong credentials'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  return (
    <Container className="mt-5">
      <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleLogin} data-testid="login_form">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="Username"
                data-testid="username"
                placeholder="Enter username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="Password"
                data-testid="password"
                placeholder="Enter password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginForm
