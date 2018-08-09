import React from 'react'
import { shallow } from 'enzyme'
import map from 'lodash.map'

import { List, ListItem } from '../'

describe('Component/List', () => {
  const listItems = [{ id: 1, title: 'some item' }, { id: 2, title: 'some other item' }]

  test('should render without throwing an error', () => {
    const wrapper = shallow(
      <List>{map(listItems, item => <ListItem key={item.id}>{item.title}</ListItem>)}</List>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('should attach an onClick and onKeyPress event to ListItems', () => {
    const onClick = jest.fn()
    const onKeyPress = jest.fn()

    const wrapper = shallow(
      <List>
        {map(listItems, item => (
          <ListItem key={item.id} onClick={onClick} onKeyPress={onKeyPress}>
            {item.title}
          </ListItem>
        ))}
      </List>,
    )
    const firstItem = wrapper.find(ListItem).first()

    firstItem.simulate('click')
    firstItem.simulate('keypress')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onKeyPress).toHaveBeenCalledTimes(1)
  })
})
