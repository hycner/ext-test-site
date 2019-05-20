import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'

import {setSettings} from '../../modules/settings/redux';
import {dispatch} from '../../store';
import {Store} from '../../modules/rootReducer';
import {StoreSettings, StoreSettingsLogin} from '../../modules/settings/redux';
import Fields from './fields'
import ConfigMenu from './configMenu'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
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
  allSettings: StoreSettings
  settings: StoreSettingsLogin
}

function LoginSection(props: Props) {
  function toggleField(field: 'isVisible' | 'areIdsUnique' | 'isForm') {
    let newVal = !props.settings[field]

    dispatch(setSettings({
      section: 'login',
      settings: {
        [field]: newVal,
      },
    }))
  }
  function increaseIterations() {
    let newVal = props.settings.iterations + 1

    dispatch(setSettings({
      section: 'login',
      settings: {
        iterations: newVal,
      },
    }))
  }
  function decreaseIterations() {
    if (props.settings.iterations > 1) {
      let newVal = props.settings.iterations - 1

      dispatch(setSettings({
        section: 'login',
        settings: {
          iterations: newVal,
        },
      }))
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
          isForm={props.settings.isForm}
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
          &nbsp; Login Fields &nbsp;
          <Tooltip title="Fake login fields available for Keeper's extension to target.">
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
              isForm={props.settings.isForm}
              toggleIsForm={() => toggleField('isForm')}
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
    allSettings: state.settings,
    settings: state.settings.login,
  }
}

export default connect(mapStateToProps)(LoginSection)
