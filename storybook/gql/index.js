/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator } from '@storybook/react'
import apolloStorybookDecorator from 'apollo-storybook-react'

import { typeDefs } from './type-definitions'
import { mocks } from './mocks'

// will result in a global decorator for all stories
export const addApolloDecorator = () => {
  addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
}
