import { useSelector } from 'react-redux'
import { Alert, Container } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  const variant = notification.type === 'error' ? 'danger' : 'success'

  return (
    <Container className="mt-3">
      <Alert variant={variant} className="shadow-sm">
        {notification.message}
      </Alert>
    </Container>
  )
}
export default Notification
