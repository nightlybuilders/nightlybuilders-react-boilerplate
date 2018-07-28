import React from 'react'
import { App } from '../component'

describe('Components/App', () => {
  test('renders without throwing an error', () => {
    expect(<App />).toMatchSnapshot()
  })
})
