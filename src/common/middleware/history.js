// Docs:
// - https://github.com/supasate/connected-react-router/blob/master/src/actions.js
// - example args: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#to-object
import { push } from 'connected-react-router'

export default store => next => action => {
  switch (action.type) {
    case 'NAVIGATE':
      const { args = {}, path } = action
      if (!path) {
        return next(action)
      }

      store.dispatch(
        push({
          pathname: path,
          ...args,
        }),
      )
      return next(action)
    default:
      return next(action)
  }
}
