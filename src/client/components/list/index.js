/**
 * Example Component, to illustrate how to use (see ./index.js) server-side
 * prefetched data, which is already stored in the redux browser
 */
import { connect } from 'react-redux'
import get from 'lodash.get'
import omit from 'lodash.omit'
import pick from 'lodash.pick'

import { List as ListComponent } from './component'

const mapStateToProps = state => ({
  data: get(state, 'posts.data.posts', {}), // TODO: remove and get only from props
})

const mapDispatchToProps = () => ({})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  actions: {
    getKey: d => d.id,
    getValue: d => d.title,
    ...pick(ownProps, ['getKey', 'getValue']),
  },
  ...stateProps,
  ...ownProps,
  otherProps: {
    ...omit(ownProps, ['data', 'getKey', 'getValue']),
  },
})

export const List = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListComponent)
