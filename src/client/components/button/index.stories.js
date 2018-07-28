/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'

// Components
import { Button } from './'
import componentReadme from './README.md'

storiesOf('Components/Button', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => <Button onClick={action('onClick')}>Click Me</Button>)
