import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'

import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {setSettings, StoreSettingsAddress} from '../../modules/settings/redux'
import {dispatch} from '../../store'
import {Store} from '../../modules/rootReducer'

import Fields from './fields'
import ConfigMenu from '../_configMenu'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
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
  cursor: 'initial',
}

type Props = {
  settings: StoreSettingsAddress
  singleSectionDisplay: SingleSectionDisplay
}

const AddressSection: React.FC<Props> = props => {
  function toggleField(
    field:
      | 'areIdsUnique'
      | 'hasEmail'
      | 'hasName'
      | 'hasPhone'
      | 'isForm'
      | 'isIframeField'
      | 'isIframeSection'
      | 'isMultiButton'
      | 'isVisible'
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
    let height = 325
    if (props.settings.hasEmail) height += 37
    if (props.settings.hasPhone) height += 37

    const iNodes = []
    for (let i = 0; i < props.settings.iterations; i++) {
      if (props.settings.isIframeSection && !props.singleSectionDisplay) {
        iNodes.push(
          <iframe
            key={i}
            src={`${window.location.href}?singleSection=address&iteration=${i + 1}`}
            width="320"
            height={height}
            style={{border: 0}}
          />
        )
      } else {
        iNodes.push(<Fields key={i} iteration={i + 1} />)
      }
    }
    return iNodes
  }

  const configMenuItems = [
    {
      key: 'unique',
      label: 'Disable Unique IDs',
      onChange: () => toggleField('areIdsUnique'),
      value: !props.settings.areIdsUnique,
    },
    {
      key: 'form',
      label: 'Wrap each section in <form>',
      onChange: () => toggleField('isForm'),
      value: props.settings.isForm,
    },
    {
      key: 'iframeSection',
      label: 'Wrap each section in <iframe>',
      onChange: () => toggleField('isIframeSection'),
      value: props.settings.isIframeSection,
    },
    // {
    //   key: 'iframeField',
    //   label: 'Wrap each field in <iframe>',
    //   onChange: () => toggleField('isIframeField'),
    //   value: props.settings.isIframeField,
    // },
    {
      key: 'buttons',
      label: 'Multiple Buttons',
      onChange: () => toggleField('isMultiButton'),
      value: props.settings.isMultiButton,
    },
    {
      key: 'email',
      label: 'Email Field',
      onChange: () => toggleField('hasEmail'),
      value: props.settings.hasEmail,
    },
    {
      key: 'name',
      label: 'Name Field',
      onChange: () => toggleField('hasName'),
      value: props.settings.hasName,
    },
    {
      key: 'phone',
      label: 'Phone Field',
      onChange: () => toggleField('hasPhone'),
      value: props.settings.hasPhone,
    },
  ]

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
          <Tooltip title="Fake address fields for extensions to target. If you enable any iframe config settings, then DOM iframe access tests will fail.">
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
            <ConfigMenu items={configMenuItems} />
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
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(AddressSection)
