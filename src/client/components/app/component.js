/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import BemHelper from 'react-bem-helper'
import PropTypes from 'prop-types'
import dbg from 'debug'
import get from 'lodash.get'
import invoke from 'lodash.invoke'
import map from 'lodash.map'

import { Button } from '../button'
import { Image } from '../image'
import { Meta } from '../meta'
import { List, ListItem } from '../list'
import { Rates } from '../rates'

// Styling
const classes = new BemHelper('app')

const debug = dbg('nb:App')

export class App extends Component {
  componentDidMount = () => {
    // Illustration: how to refresh data from Apollo
    setTimeout(() => {
      debug('refreshData')
      invoke(this.props, 'data.refetch')
    }, 10000)
  }

  onClick = change => {
    const { actions = {} } = this.props
    invoke(actions, 'onClick', change)
  }

  onNavigate = (path, args) => {
    const { actions = {} } = this.props
    invoke(actions, 'onNavigate', path, args)
  }

  render() {
    const { otherProps, store } = this.props

    return (
      <div {...classes()}>
        <Meta title="Hello World" description="Hello Description" />
        <Image {...classes('image')} {...otherProps.image} />
        <h1 {...classes('headline')}>{get(otherProps, 'title')}</h1>
        <p>Current State with Counter: {get(store, 'app.data.counter')}</p>
        <div {...classes('container', 'buttons')}>
          <Button onClick={() => this.onClick(1)}>+1</Button>
          <Button onClick={() => this.onClick(-1)}>-1</Button>
        </div>
        <div {...classes('container')}>
          <Button onClick={() => this.onNavigate('example', { hash: '#some-hash' })}>
            Open Example Page
          </Button>
        </div>
        <div {...classes('container')}>
          <h3>Prefetched Posts (Redux)</h3>
          <List>
            {map(get(store, 'posts') || [], post => (
              <ListItem key={post.id}>{post.title}</ListItem>
            ))}
          </List>
        </div>
        <div {...classes('container')}>
          <Rates />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  otherProps: PropTypes.shape({
    image: PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }),
  store: PropTypes.shape({
    app: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
}
App.defaultProps = {
  actions: {
    onClick: () => {},
  },
  data: {},
  otherProps: {
    image: {
      alt: '',
      src: '',
    },
    title: 'Hello',
  },
  store: {
    app: {
      data: {
        counter: 0,
      },
    },
  },
}
