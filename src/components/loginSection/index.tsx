import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'

import {setSettings} from '../../modules/settings/redux'
import {dispatch} from '../../store'
import {Store} from '../../modules/rootReducer'
import {StoreSettingsLogin} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap';
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
const DISABLED_ICON_STYLE = {
  ...ICON_STYLE,
  opacity: 0.5,
  cursor: 'initial'
}

type Props = {
  settings: StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  function toggleField(
    field: 'areIdsUnique' | 'isForm' | 'isIframeSection' | 'isMultiButton' | 'isThreeField' | 'isVisible'
  ) {
    dispatch(
      setSettings({
        section: 'login',
        settings: {
          [field]: !props.settings[field],
        },
      })
    )
  }
  function increaseIterations() {
    dispatch(
      setSettings({
        section: 'login',
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
          section: 'login',
          settings: {
            iterations: props.settings.iterations - 1,
          },
        })
      )
    }
  }

  function renderIterations() {
    let height = 140
    if (props.settings.isThreeField) height += 37

    const iNodes = []
    for (let i = 0; i < props.settings.iterations; i++) {
      if (props.settings.isIframeSection && !props.singleSectionDisplay) {
        iNodes.push(
          <iframe
            key={i}
            src={`${window.location.href}?singleSection=login&iteration=${i + 1}`}
            width="320"
            height={height}
            style={{border:0}}
          />
        )
      } else {
        iNodes.push(
          <Fields
            key={i}
            iteration={i + 1}
          />
        )
      }
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
          <Tooltip title="Fake login fields for extensions to target">
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
              style={props.settings.iterations > 1 ? ICON_STYLE : DISABLED_ICON_STYLE}
              onClick={decreaseIterations}
            />
            <ConfigMenu
              areIdsUnique={props.settings.areIdsUnique}
              isForm={props.settings.isForm}
              isIframeSection={props.settings.isIframeSection}
              isMultiButton={props.settings.isMultiButton}
              isThreeField={props.settings.isThreeField}
              toggleIsForm={() => toggleField('isForm')}
              toggleIsIframeSection={() => toggleField('isIframeSection')}
              toggleMultiButton={() => toggleField('isMultiButton')}
              toggleIsThreeField={() => toggleField('isThreeField')}
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
    settings: state.settings.login,
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(LoginSection)
