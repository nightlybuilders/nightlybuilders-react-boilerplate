/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

// Component
import { App } from './component'
import componentReadme from './README.md'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
    }
  }

  onClick = value => {
    action('onClick')(value)
    this.setState({ counter: this.state.counter + value })
  }

  onNavigate = (path, args) => {
    action('onNavigate')(path, args)
  }

  render() {
    return (
      <App
        actions={{
          onClick: this.onClick,
          onNavigate: this.onNavigate,
        }}
        store={{
          app: { data: { cachebuster: 123456789, counter: this.state.counter } },
          posts: [{ id: 1, title: 'some title' }, { id: 2, title: 'some other title' }],
        }}
        otherProps={{
          image: {
            alt: 'App',
            src: 'http://via.placeholder.com/350x150',
          },
          title: 'Hello Storybook',
        }}
      />
    )
  }
}

// The actual story rendered in the Storybook
storiesOf('Components/App', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => <Wrapper />)
