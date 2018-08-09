import React from 'react'
import { shallow } from 'enzyme'

import { Rates } from '../component'

describe('Component/Rates', () => {
  const rates = [{ currency: 'EUR' }, { currency: 'USD' }]

  test('should render without throwing an error', () => {
    const wrapper = shallow(<Rates data={{ rates }} />)
    expect(wrapper).toMatchSnapshot()
  })
})
