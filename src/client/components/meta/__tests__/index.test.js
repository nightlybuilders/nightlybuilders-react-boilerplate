import React from 'react'
import { shallow } from 'enzyme'

import { Meta } from '../'

const ChildMeta = () => <meta charSet="utf-8" />

describe('Component/Meta', () => {
  const props = {
    description: 'Test Description',
    title: 'Test Title',
  }

  test('should render without throwing an error', () => {
    const wrapper = shallow(<Meta {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render children', () => {
    const wrapper = shallow(
      <Meta {...props}>
        <ChildMeta />
      </Meta>,
    )
    expect(wrapper.find(ChildMeta)).toHaveLength(1)
  })
})
