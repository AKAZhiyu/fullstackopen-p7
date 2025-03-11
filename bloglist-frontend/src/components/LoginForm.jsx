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
    <form onSubmit={handleLogin} data-testid="login_form">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
