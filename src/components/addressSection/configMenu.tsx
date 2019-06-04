import React from 'react'
import styled from 'styled-components'
import {Checkbox, Icon, Popover} from 'antd'

const SettingWrap = styled.div`
  margin-bottom: 10px;
`

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
}

type Props = {
  areIdsUnique: boolean
  hasEmail: boolean
  hasPhone: boolean
  isForm: boolean
  isIframeField: boolean
  isIframeSection: boolean
  isMultiButton: boolean
  toggleHasEmail: () => void
  toggleHasPhone: () => void
  toggleIsForm: () => void
  toggleIsIframeField: () => void
  toggleIsIframeSection: () => void
  toggleMultiButton: () => void
  toggleUniqueIds: () => void
}

const configMenu: React.FC<Props> = props => {
  const popoverContent = (
    <div>
      <SettingWrap key="unique">
        <Checkbox checked={!props.areIdsUnique} onChange={props.toggleUniqueIds}>
          Disable Unique IDs
        </Checkbox>
      </SettingWrap>

      <SettingWrap key="form">
        <Checkbox checked={props.isForm} onChange={props.toggleIsForm}>
          Wrap each section in {'<form>'}
        </Checkbox>
      </SettingWrap>

      <SettingWrap key="iframeSection">
        <Checkbox checked={props.isIframeSection} onChange={props.toggleIsIframeSection}>
          Wrap each section in {'<iframe>'}
        </Checkbox>
      </SettingWrap>

      {/*<SettingWrap key="iframeField">*/}
      {/*  <Checkbox checked={props.isIframeField} onChange={props.toggleIsIframeField}>*/}
      {/*    Wrap each field in {'<iframe>'}*/}
      {/*  </Checkbox>*/}
      {/*</SettingWrap>*/}

      <SettingWrap key="buttons">
        <Checkbox checked={props.isMultiButton} onChange={props.toggleMultiButton}>
          Multiple Buttons
        </Checkbox>
      </SettingWrap>

      <SettingWrap key="email">
        <Checkbox checked={props.hasEmail} onChange={props.toggleHasEmail}>
          Email Field
        </Checkbox>
      </SettingWrap>

      <SettingWrap key="phone">
        <Checkbox checked={props.hasPhone} onChange={props.toggleHasPhone}>
          Phone Field
        </Checkbox>
      </SettingWrap>
    </div>
  )

  return (
    <Popover content={popoverContent} title="Configuration" placement="bottomLeft">
      <Icon type="setting" theme="filled" style={ICON_STYLE} />
    </Popover>
  )
}
export default configMenu
