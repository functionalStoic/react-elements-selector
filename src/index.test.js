import React from 'react'
import {render} from 'react-testing-library'

import ElementsSelector from './'

describe('ElementsSelector', () => {
  it('renders', () => {
    expect(<ElementsSelector />).toMatchSnapshot()
  })

  it('renders with array', () => {
    const items = [1, 2, 3, 4]
    expect(
      <ElementsSelector
        items={items}
        notSelectable={items.filter(item => !item.selectable)}
      >
        {() => {
          ;<div />
        }}
      </ElementsSelector>
    ).toMatchSnapshot()
  })
})
