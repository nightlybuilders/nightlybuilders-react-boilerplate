import React from 'react'
import { Image } from '../'

describe('Components/Image', () => {
  test('renders without throwing an error', () => {
    expect(
      <Image styles={{ width: 150 }} src={'http://via.placeholder.com/350x150'} alt="App" />,
    ).toMatchSnapshot()
  })
})
