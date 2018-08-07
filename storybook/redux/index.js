/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { addDecorator } from '@storybook/react'
import { Provider as ReduxProvider } from 'react-redux'
import { createReduxStore } from '../../src/common/createStore'

// creates a redux store based on the actual implementation settings used by the
// App
const { store } = createReduxStore()

// eslint-disable-next-line react/prop-types
export const Provider = ({ story }) => <ReduxProvider store={store}>{story()}</ReduxProvider>

// will result in a global decorator for all stories
export const addReduxDecorator = () => {
  addDecorator(story => <Provider story={story} />)
}
