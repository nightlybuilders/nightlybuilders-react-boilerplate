import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash.get'
import omit from 'lodash.omit'
import dbg from 'debug'

// store actions & component
import { services } from '../../../common/services'
import { receivePosts } from '../../../common/actions/posts'
import { changeCounter } from '../../../common/actions/app'
import { App } from './component'

const debug = dbg('nb:AppContainer')

const mapStateToProps = state => ({
  app: get(state, 'app', {}),
})

const mapDispatchToProps = dispatch => ({ dispatch })

// in our boilerplate we defined to use the following structure in HOC for properties
// like actions or data from the store:
// {
//    actions: {}, // actions the component can trigger, like onClick
//    data: {}, // data the component receives from the apollo client
//    otherProps: {}, // all other properties other components pass to the component
//    store: {}, // data the component receives from the Redux Store
// }
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  actions: {
    onClick: change => {
      dispatchProps.dispatch(changeCounter(change))
    },
    onNavigate: (path, args) => {
      dispatchProps.dispatch({ type: 'NAVIGATE', path, args })
    },
  },
  data: {
    // apollo
    ...ownProps.data,
  },
  otherProps: {
    title: 'Hello App',
    image: {
      alt: 'App',
      src: '350x150.png', // from the static folder or from another domain
    },
    ...omit(ownProps, ['data']),
  },
  store: {
    // redux
    ...stateProps,
  },
})

const AppWrapper = props => <App {...props} />

// will preloaded in the server/handler.js
AppWrapper.loadData = async store => {
  try {
    const api = services.get('api')
    if (api.fetch) {
      const preloadedData = await api.fetch('posts')
      store.dispatch(receivePosts(preloadedData))
    }

    store.dispatch(changeCounter(1))
  } catch (e) {
    debug(e)
    // do nothing
  }
  return true
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AppWrapper)
