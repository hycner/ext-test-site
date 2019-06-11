import React from 'react'
import {connect} from 'react-redux'
import {Card, Timeline} from 'antd'
import styled from 'styled-components'

import {Store} from '../../modules/rootReducer'
import {TimelineData} from '../../modules/test/selectors/getTimelineData'
import {getTimelineData} from '../../modules/test/selectors/getTimelineData'

const CARD_STYLE = {
  paddingTop: 60,
  minWidth: 200,
}

const TestTitle = styled.div`
  font-size: 16px;
`

type Props = {
  timelineData: TimelineData
}

const Output: React.FC<Props> = props => {
  const {timelineData} = props

  return (
    <Card style={CARD_STYLE}>
      <Timeline pending={timelineData.pendingText} reverse={true}>
        {timelineData.items.map(x => (
          <Timeline.Item key={x.key} color={x.hasErrors ? 'red' : 'green'}>
            <TestTitle>{x.label}</TestTitle>
            {x.errors.map((x, i) => (
              <div key={i}>• {x}</div>
            ))}
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  )
}

function mapStateToProps(state: Store) {
  return {
    timelineData: getTimelineData(state),
  }
}

export default connect(mapStateToProps)(React.memo(Output))
