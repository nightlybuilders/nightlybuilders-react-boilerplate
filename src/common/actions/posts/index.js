const actions = {
  RECEIVE_POSTS: 'RECEIVE_POSTS',
}

const receivePosts = data => ({ type: actions.RECEIVE_POSTS, data })

export { actions, receivePosts }
