import { connect } from 'react-redux'
import get from 'lodash.get'

import { Image as ImageComponent } from './component'

const mapStateToProps = state => ({
  cachebuster: get(state, 'app.data.cachebuster'),
})

const mapDispatchToProps = () => ({})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  data: {
    ...stateProps,
  },
  ...ownProps,
})

export const Image = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ImageComponent)
