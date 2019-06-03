import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'

import {setSettings} from '../../modules/settings/redux'
import {dispatch} from '../../store'
import {Store} from '../../modules/rootReducer'
import {StoreSettingsAddress} from '../../modules/settings/redux'
import Fields from './fields'
import ConfigMenu from './configMenu'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const Header = styled.div`
  font-size: 16px;
`
const SpecificSettings = styled.div`
  margin-top: 3px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
`

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
}

type Props = {
  settings: StoreSettingsAddress
}

const AddressSection: React.FC<Props> = props => {
  function toggleField(
    field: 'areIdsUnique' | 'hasEmail' | 'hasPhone' | 'isForm' | 'isMultiButton' | 'isVisible'
  ) {
    dispatch(
      setSettings({
        section: 'address',
        settings: {
          [field]: !props.settings[field],
        },
      })
    )
  }
  function increaseIterations() {
    dispatch(
      setSettings({
        section: 'address',
        settings: {
          iterations: props.settings.iterations + 1,
        },
      })
    )
  }
  function decreaseIterations() {
    if (props.settings.iterations > 1) {
      dispatch(
        setSettings({
          section: 'address',
          settings: {
            iterations: props.settings.iterations - 1,
          },
        })
      )
    }
  }

  function renderIterations() {
    const iNodes = []
    for (let i = 0; i < props.settings.iterations; i++) {
      iNodes.push(
        <Fields
          key={i}
          iteration={i + 1}
          areIdsUnique={props.settings.areIdsUnique}
          hasEmail={props.settings.hasEmail}
          hasPhone={props.settings.hasPhone}
          isForm={props.settings.isForm}
          isMultiButton={props.settings.isMultiButton}
        />
      )
    }
    return iNodes
  }

  return (
    <Wrap>
      <Header>
        <div>
          <Icon
            type={props.settings.isVisible ? 'eye' : 'eye-invisible'}
            theme="filled"
            style={ICON_STYLE}
            onClick={() => toggleField('isVisible')}
          />
          &nbsp; Address Fields &nbsp;
          <Tooltip title="Fake address fields for extensions to target">
            <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
          </Tooltip>
        </div>

        {props.settings.isVisible && (
          <SpecificSettings>
            <Icon
              type="plus-circle"
              theme="filled"
              style={ICON_STYLE}
              onClick={increaseIterations}
            />
            <Icon
              type="minus-circle"
              theme="filled"
              style={ICON_STYLE}
              onClick={decreaseIterations}
            />
            <ConfigMenu
              areIdsUnique={props.settings.areIdsUnique}
              hasEmail={props.settings.hasEmail}
              hasPhone={props.settings.hasPhone}
              isForm={props.settings.isForm}
              isMultiButton={props.settings.isMultiButton}
              toggleHasEmail={() => toggleField('hasEmail')}
              toggleHasPhone={() => toggleField('hasPhone')}
              toggleIsForm={() => toggleField('isForm')}
              toggleMultiButton={() => toggleField('isMultiButton')}
              toggleUniqueIds={() => toggleField('areIdsUnique')}
            />
          </SpecificSettings>
        )}
      </Header>

      {props.settings.isVisible && renderIterations()}
    </Wrap>
  )
}

function mapStateToProps(state: Store) {
  return {
    settings: state.settings.address,
  }
}

export default connect(mapStateToProps)(AddressSection)
