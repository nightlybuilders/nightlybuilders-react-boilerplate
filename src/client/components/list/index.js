/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { apiClient } from '../../../common/api/client'

/**
 * Example Component, to illustrate server-side prefetching and hydration of data
 *
 * inspired by (Credits):
 * - https://alligator.io/react/react-router-ssr/
 */
export class List extends React.Component {
  constructor(props) {
    super(props)

    // TODO: staticContext provided by ServerRouter is not yet in the redux store,
    // see src/server/handler.js for more details for this task
    if (props.staticContext && props.staticContext.data) {
      this.state = {
        data: props.staticContext.data,
      }
    } else {
      this.state = {
        data: [],
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (window && get(window, '__PRELOADED_DATA__.posts')) {
        this.setState({
          data: get(window, '__PRELOADED_DATA__.posts'),
        })
        delete window.__PRELOADED_DATA__.posts // CAUTION: other components cannot use it anymore
      } else {
        apiClient('posts').then(data => {
          this.setState({
            data,
          })
        })
      }
    }, 0)
  }

  render() {
    const { data = [] } = this.state
    return <ul>{data.length > 0 && data.map(post => <li key={post.id}>{post.title}</li>)}</ul>
  }
}

List.propTypes = {
  staticContext: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}
List.defaultProps = {
  staticContext: {},
}
