/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import BemHelper from 'react-bem-helper'

// Styling
const classes = new BemHelper('list')

export const List = props => {
  const { posts } = get(props, 'data.posts.data')
  return (
    <ul {...classes()}>
      {posts.length > 0 && posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}

List.displayName = 'List'
List.propTypes = {
  staticContext: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}
List.defaultProps = {
  staticContext: {},
}
