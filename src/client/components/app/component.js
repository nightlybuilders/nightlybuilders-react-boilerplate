import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Utils
import get from 'lodash.get'
import BemHelper from 'react-bem-helper'
import invoke from 'lodash.invoke'

// Components
import { Button } from '../button'
import { Image } from '../image'

// Styling
const classes = new BemHelper('app')

export class App extends Component {
  onClick = change => {
    const { actions = {} } = this.props
    invoke(actions, 'onClick', change)
  }

  render() {
    const { data, props } = this.props

    return (
      <div {...classes()}>
        <Image {...classes('image')} {...props.image} />
        <h1 {...classes('headline')}>{get(props, 'title')}</h1>
        <p>Current State with Counter: {get(data, 'app.data.counter')}</p>
        <div {...classes('buttons')}>
          <Button onClick={() => this.onClick(1)}>+1</Button>
          <Button onClick={() => this.onClick(-1)}>-1</Button>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  data: PropTypes.shape({
    app: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
  props: PropTypes.shape({
    image: PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }),
}
App.defaultProps = {
  actions: {
    onClick: () => {},
  },
  data: {
    app: {
      data: {
        counter: 0,
      },
    },
  },
  props: {
    image: {
      alt: '',
      src: '',
    },
    title: 'Hello',
  },
}
