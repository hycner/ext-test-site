import React from 'react'
import styled from 'styled-components'
import {Checkbox, Divider, Icon, Popover} from 'antd'

const SettingWrap = styled.div`
  margin-bottom: 10px;
`

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
}
const DIVIDER_STYLE = {
  marginTop: 15,
  marginBottom: 15,
}

export type ConfigMenuItems = Array<
  Array<{
    key: string
    label: any
    value: boolean
  }>
>
type Props = {
  items: ConfigMenuItems
  toggleFunc: (key: string) => void
}

const configMenu: React.FC<Props> = props => {
  const popoverContent = (
    <div>
      {props.items.map((category, i) => (
        <div key={i}>
          {category.map(item => (
            <SettingWrap key={item.key}>
              <Checkbox checked={item.value} onChange={() => props.toggleFunc(item.key)}>
                {item.label}
              </Checkbox>
            </SettingWrap>
          ))}

          {i !== props.items.length - 1 && <Divider style={DIVIDER_STYLE} />}
        </div>
      ))}
    </div>
  )

  return (
    <Popover content={popoverContent} title="Configuration" placement="bottomLeft">
      <Icon type="setting" theme="filled" style={ICON_STYLE} />
    </Popover>
  )
}
export default React.memo(configMenu)
