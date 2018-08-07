/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { addReduxDecorator } from './redux'
import { addApolloDecorator } from './gql'

// load all files in /components that end with .stories.js(x)
const req = require.context('../src/client/components', true, /\.stories\.js?$/)
require('../src/client/styles/main.scss')

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

setOptions({
  name: 'nightlybuilders react-boilerplate',
  showAddonPanel: true,
  sortStoriesByKind: true,
  url: '#',
})

// add additional decorators
addReduxDecorator()
addApolloDecorator()

configure(loadStories, module)
