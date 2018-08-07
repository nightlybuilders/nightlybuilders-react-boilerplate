/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import withReadme from 'storybook-readme/with-readme'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

// Component
import { Rates } from './component'
import componentReadme from './README.md'

// prepare container (one could also use the actual container instead)
const query = gql`
  query {
    rates(currency: "USD") {
      currency
    }
  }
`
const RatesContainer = graphql(query)(Rates)

storiesOf('Components/Rates', module)
  .addDecorator(withReadme(componentReadme))
  .add('default', () => <RatesContainer />)
