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
  items: Array<{
    key: string
    label: any
    onChange: () => void
    value: boolean
  }>
}

const configMenu: React.FC<Props> = props => {
  const popoverContent = (
    <div>
      {props.items.map(x => (
        <SettingWrap key={x.key}>
          <Checkbox checked={x.value} onChange={x.onChange}>
            {x.label}
          </Checkbox>
        </SettingWrap>
      ))}
    </div>
  )

  return (
    <Popover content={popoverContent} title="Configuration" placement="bottomLeft">
      <Icon type="setting" theme="filled" style={ICON_STYLE} />
    </Popover>
  )
}
export default configMenu
