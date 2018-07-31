import { connect } from 'react-redux'
import get from 'lodash.get'

import { changeCounter } from '../../../common/actions/app'
import { App } from './component'

const mapStateToProps = state => ({
  app: get(state, 'app', {}),
})

const mapDispatchToProps = dispatch => ({ dispatch })

// in our boilerplate we defined to use the following structure in HOC for properties
// like actions or data from the store:
// {
//    actions: {}, // actions the component can trigger, like onClick
//    data: {}, // data the component receives from the redux store for example
//    props: {}, // all other properties other components pass to the component
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
    ...stateProps,
  },
  props: {
    title: 'Hello App',
    image: {
      alt: 'App',
      // src: 'http://via.placeholder.com/350x150', // alternative
      src: '350x150.png',
    },
    ...ownProps,
  },
})

export const AppContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
