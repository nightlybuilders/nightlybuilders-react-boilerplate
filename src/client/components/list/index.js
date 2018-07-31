/**
 * Example Component, to illustrate how to use (see ./index.js) server-side
 * prefetched data, which is already stored in the redux browser
 */
import { connect } from 'react-redux'
import get from 'lodash.get'

import { List as ListComponent } from './component'

const mapStateToProps = state => ({
  posts: get(state, 'posts', {}),
})

const mapDispatchToProps = () => ({})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  data: {
    ...stateProps,
  },
  props: {
    ...ownProps,
  },
})

export const List = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListComponent)
