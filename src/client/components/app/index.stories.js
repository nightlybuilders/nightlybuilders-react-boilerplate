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

  render() {
    return (
      <App
        actions={{ onClick: this.onClick }}
        data={{ app: { data: { counter: this.state.counter } } }}
        props={{
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
