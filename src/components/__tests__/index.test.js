import React from 'react'
import {shallow} from 'enzyme'
import {App} from '../index'

describe('Component: App', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
})
