import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((prev) => {
      console.log('Visible changing from', prev, 'to', !prev)
      return !prev
    })
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      {!visible && (
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={toggleVisibility} className="mb-2">
            {props.buttonLabel}
          </Button>
        </div>
      )}

      {visible && (
        <div>
          {props.children}
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-secondary"
              onClick={toggleVisibility}
              className="mt-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
