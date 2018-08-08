/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

import componentReadme from './README.md'

import { Button } from './'

storiesOf('Components/Button', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => <Button onClick={action('onClick')}>Click Me</Button>)
