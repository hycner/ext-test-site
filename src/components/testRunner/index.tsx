import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Button, Icon, Tooltip} from 'antd'

import {Store} from '../../modules/rootReducer'
import {dispatch} from '../../store'
import {runTests} from '../../modules/test/redux/run'
import Output from './output'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 300px;
`

const Header = styled.div`
  font-size: 16px;
`

const ICON_STYLE = {
  fontSize: 18,
}
const BTN_STYLE = {
  marginBottom: 5,
}

type Props = {
  areTestsRunning: boolean
  hasTestsRan: boolean
}

const TestRunner: React.FC<Props> = props => {
  function runTestsHelper() {
    dispatch(runTests())
  }

  return (
    <Wrap>
      <Header>
        Run Tests &nbsp;
        <Tooltip title="Runs a series of tests on the page. Can be run multiple times with different configurations.">
          <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
        </Tooltip>
      </Header>
      <Button
        type="primary"
        size="large"
        style={BTN_STYLE}
        onClick={runTestsHelper}
        loading={props.areTestsRunning}
      >
        Start
      </Button>

      {props.hasTestsRan && <Output />}
    </Wrap>
  )
}

function mapStateToProps(state: Store) {
  return {
    areTestsRunning: state.test.run.isLoading,
    hasTestsRan: state.test.run.data.hasRun,
  }
}

export default connect(mapStateToProps)(React.memo(TestRunner))
