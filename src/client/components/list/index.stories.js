/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withReadme from 'storybook-readme/with-readme'
import map from 'lodash.map'

import componentReadme from './README.md'

import { List, ListItem } from './'

const listItems = [{ id: 1, title: 'some title' }, { id: 2, title: 'some other title' }]

const onClick = data => action('onClick')(data)

storiesOf('Components/List', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => (
    <List>
      {map(listItems, item => (
        <ListItem onClick={() => onClick(item)} key={item.id}>
          {item.title}
        </ListItem>
      ))}
    </List>
  ))
