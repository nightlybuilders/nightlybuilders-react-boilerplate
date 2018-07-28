/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import withReadme from 'storybook-readme/with-readme'

// Components
import { Image } from './'
import componentReadme from './README.md'

storiesOf('Components/Image', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <Image styles={{ width: 150 }} src={'http://via.placeholder.com/350x150'} alt="App" />
  ))
