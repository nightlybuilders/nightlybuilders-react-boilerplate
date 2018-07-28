import get from 'lodash.get'
import merge from 'lodash.merge'
import { app } from '../../actions'

const initialState = {
  data: {
    counter: 0,
  },
}

const { actions } = app

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  const data = get(action, 'data', 0)

  switch (type) {
    case actions.CHANGE_COUNTER:
      return merge({}, state, {
        data: {
          counter: state.data.counter + data.change,
        },
      })
    default:
      return state
  }
}
