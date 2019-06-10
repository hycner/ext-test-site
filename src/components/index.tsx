import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Skeleton, Spin} from 'antd'

import {Store} from '../modules/rootReducer'
import {SingleSectionDisplay} from '../modules/app/redux/bootstrap'

import {dispatch} from '../store'
import {bootstrap} from '../modules/app/redux/bootstrap'
import AddressSection from './addressSection'
import CreditCardSection from './creditCardSection'
import IFrameSpawner from './iframeSpawner'
import LoginSection from './loginSection'
import SingleComponent from './singleComponent'
import SingleSection from './singleSection'
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
const SkeleWrap = styled.div`
  margin: auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
`

type Props = {
  isBootstrapDone: boolean
  singleComponentDisplay: boolean | string
  singleSectionDisplay: SingleSectionDisplay
}

export const App: React.FC<Props> = props => {
  useEffect(() => {
    // setTimeout(() => dispatch(bootstrap()), 5000)
    dispatch(bootstrap())
  }, [])

  const content = props.isBootstrapDone
    ? (
      <Wrap>
        {!props.singleComponentDisplay && !props.singleSectionDisplay && (
          <>
            <Header>Extension Tester</Header>

            <TestRunner />
            <LoginSection />
            <CreditCardSection />
            <AddressSection />
            <IFrameSpawner />
          </>
        )}
        {props.singleComponentDisplay && (
          <SingleComponent component={String(props.singleComponentDisplay) || ''} />
        )}
        {props.singleSectionDisplay && <SingleSection />}
      </Wrap>
    ) : (
      <SkeleWrap>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </SkeleWrap>
    )

  return (
    <Spin size="large" spinning={!props.isBootstrapDone}>
      {content}
    </Spin>
  )
}

function mapStateToProps(state: Store) {
  return {
    isBootstrapDone: state.app.bootstrap.isDone,
    singleComponentDisplay: state.app.bootstrap.singleComponentDisplay,
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(App)
