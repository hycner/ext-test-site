import React from 'react'
import styled from 'styled-components'
import {Checkbox, Divider, Popover} from 'antd'
import {SettingFilled} from '@ant-design/icons'

const SettingWrap = styled.div`
  margin-bottom: 10px;
`
const Indent = styled.span`
  margin-right: 15px;
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
    masterValid?: boolean
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
          {category.map(item => {
            if (item.masterValid === false) return null

            return (
              <SettingWrap key={item.key}>
                {item.masterValid && <Indent />}
                <Checkbox checked={item.value} onChange={() => props.toggleFunc(item.key)}>
                  {item.label}
                </Checkbox>
              </SettingWrap>
            )
          })}

          {i !== props.items.length - 1 && <Divider style={DIVIDER_STYLE} />}
        </div>
      ))}
    </div>
  )

  return (
    <Popover content={popoverContent} title="Configuration" placement="bottomLeft">
      <SettingFilled style={ICON_STYLE} />
    </Popover>
  )
}
export default React.memo(configMenu)
