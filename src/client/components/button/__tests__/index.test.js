import React from 'react'
import { Button } from '../'

describe('Components/Button', () => {
  test('renders without throwing an error', () => {
    expect(<Button>Click Me</Button>).toMatchSnapshot()
  })
})
