import React from 'react'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'

import {
  setSettings,
  StoreSettingsAddress,
  StoreSettingsCreditCard,
  StoreSettingsLogin,
} from '../modules/settings/redux'
import {dispatch} from '../store'
import {SingleSectionDisplay} from '../modules/app/redux/bootstrap'
import {ConfigMenuItems} from './_configMenu'

import ConfigMenu from './_configMenu'
import AddressFields from './addressSection/fields'
import CreditCardFields from './creditCardSection/fields'
import LoginFields from './loginSection/fields'

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
  configMenuItems: ConfigMenuItems
  description: string
  fieldsComponent: typeof AddressFields | typeof CreditCardFields | typeof LoginFields
  iterationHeight: number
  label: string
  section: 'address' | 'creditCard' | 'login' // todo: combine this with other similar types as a base
  settings: StoreSettingsAddress | StoreSettingsCreditCard | StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  function toggleField(field: string) {
    dispatch(
      setSettings({
        section: props.section,
        settings: {
          // @ts-ignore ignoring for now
          [field]: !props.settings[field],
        },
      })
    )
  }

  function increaseIterations() {
    dispatch(
      setSettings({
        section: props.section,
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
          section: props.section,
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
      if (props.settings.isIframeSection && !props.singleSectionDisplay) {
        iNodes.push(
          <iframe
            key={i}
            src={`${window.location.href}?singleSection=${props.section}&iteration=${i + 1}`}
            width="320"
            height={props.iterationHeight}
            style={{border: 0}}
          />
        )
      } else {
        iNodes.push(<props.fieldsComponent key={i} iteration={i + 1} />)
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
          &nbsp; {props.label} &nbsp;
          <Tooltip title={props.description}>
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
              items={props.configMenuItems}
              toggleFunc={toggleField}
            />
          </SpecificSettings>
        )}
      </Header>

      {props.settings.isVisible && renderIterations()}
    </Wrap>
  )
}

export default LoginSection
