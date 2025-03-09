const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_INFO':
      return { type: 'info', message: action.payload }
    case 'CLEAR':
      return null
    case 'SET_ERROR':
      return { type: 'error', message: action.payload }
    default:
      return state
  }
}

export const setInfo = (info) => {
  return {
    type: 'SET_INFO',
    payload: info,
  }
}

export const setError = (error) => {
  return {
    type: 'SET_ERROR',
    payload: error,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR',
  }
}

export default notificationReducer
