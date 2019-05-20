import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Spin} from 'antd'

import {Store} from '../modules/rootReducer'
import {dispatch} from '../store'
import {bootstrap} from '../modules/app/redux/bootstrap'
import CreditCardSection from './creditCardSection'
import IFrameSpawner from './iframeSpawner'
import LoginSection from './loginSection'
import TestRunner from './testRunner'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const Header = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 26px;
`

type Props = {
  isBootstrapDone: boolean
}

export function App(props: Props) {
  useEffect(() => {
    setTimeout(() => {
      dispatch(bootstrap())
    }, 1000)
  }, [])

  return (
    <Spin size="large" spinning={!props.isBootstrapDone}>
      <Wrap>
        <Header>Extension Tester</Header>

        <TestRunner />
        <LoginSection />
        <CreditCardSection />
        <IFrameSpawner />
      </Wrap>
    </Spin>
  )
}

function mapStateToProps(state: Store) {
  return {
    isBootstrapDone: state.app.bootstrap.isDone,
  }
}

export default connect(mapStateToProps)(App)
