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
  isForm: boolean
  toggleIsForm: () => void
  toggleUniqueIds: () => void
}

export default function configMenu(props: Props) {
  const popoverContent = (
    <div>
      <SettingWrap key="unique">
        <Checkbox checked={!props.areIdsUnique} onChange={props.toggleUniqueIds}>
          Disable Unique IDs
        </Checkbox>
      </SettingWrap>
      <SettingWrap key="form">
        <Checkbox checked={props.isForm} onChange={props.toggleIsForm}>
          Wrap each in {'<form>'}
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
