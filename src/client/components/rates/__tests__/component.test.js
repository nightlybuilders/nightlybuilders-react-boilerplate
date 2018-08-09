import React from 'react'
import { shallow } from 'enzyme'

import { Rates } from '../component'

describe('Component/Rates', () => {
  const props = {
    data: {
      rates: [{ currency: 'EUR' }, { currency: 'USD' }],
      refetch: jest.fn(),
    },
  }

  test('should render without throwing an error', () => {
    const wrapper = shallow(<Rates {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should invoke refreshData after the component did mount', () => {
    // based on https://alligator.io/testing/jest-timers/
    // This has to be called before using fake timers.
    jest.useFakeTimers()
    shallow(<Rates {...props} />)

    // Runs all pending timers. whether it's a second from now or a year.
    jest.runAllTimers()
    expect(props.data.refetch).toHaveBeenCalledTimes(1)
  })
})
