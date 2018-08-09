import React from 'react'
import { shallow } from 'enzyme'

import { Button } from '../'

describe('Components/Button', () => {
  test('renders without throwing an error', () => {
    expect(
      <Button styles={{ padding: 20 }} className="some-class">
        Click Me
      </Button>,
    ).toMatchSnapshot()
  })

  test('invokes onClick when button is clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Button onClick={onClick}>Click Me</Button>)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
