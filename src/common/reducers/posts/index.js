import get from 'lodash.get'
import merge from 'lodash.merge'
import { posts } from '../../actions'

const initialState = {
  data: {
    posts: [],
  },
}

const { actions } = posts

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  const data = get(action, 'data', {})

  switch (type) {
    case actions.RECEIVE_POSTS:
      return merge({}, state, {
        data: {
          posts: data.posts || state.data.posts,
        },
      })
    default:
      return state
  }
}
