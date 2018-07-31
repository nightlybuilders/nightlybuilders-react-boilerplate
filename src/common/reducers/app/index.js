import get from 'lodash.get'
import merge from 'lodash.merge'
import { app } from '../../actions'

const initialState = {
  data: {
    cachebuster: 0,
    counter: 0,
  },
}

const { actions } = app

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  const data = get(action, 'data')

  switch (type) {
    case actions.CHANGE_COUNTER:
      return merge({}, state, {
        data: {
          counter: state.data.counter + data,
        },
      })
    case actions.CHANGE_CACHEBUSTER:
      if (!state.data.cachebuster) {
        // we allow only one manipulation of the cachebuster (usually on the SSR)
        return merge({}, state, {
          data: {
            cachebuster: data,
          },
        })
      }
      return state
    default:
      return state
  }
}
