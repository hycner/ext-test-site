import React from 'react'
import styled from 'styled-components'
import {Input, Select} from 'antd'

import {StoreSettingsSections} from '../../modules/settings/redux'
import MaybeDivWrap from './maybeDivWrap'
import MaybeNestedDivs from './maybeNestedDivs'
import MaybeLabel from './maybeLabel'

const FIELD_STYLE = {
  marginLeft: 2,
  marginRight: 2,
  marginBottom: 5,
}

const Div = styled.div`
  width: 100%;
`

type Props = {
  isPassword?: boolean
  isSelectAntd?: boolean
  iteration: number | string
  labelKey: string
  messages: {[key: string]: string}
  selectOptions?: Array<{label: string; value: string}>
  settings: StoreSettingsSections
  value: string
  valueSetter: (value: string) => void
}

const genericField: React.FC<Props> = props => {
  const label = props.messages[props.labelKey]
  const labelShort = props.messages[`${[props.labelKey]}_short`]

  return (
    <MaybeDivWrap isActive={props.settings.isWrappedInDiv}>
      <MaybeLabel
        isActive={props.settings.isLabelled}
        isOnlyText={props.settings.isLabelledOnlyText}
        label={label}
        {...(props.settings.isLabelledWithFor && {target: `${labelShort}${props.iteration}`})}
      />
      <MaybeNestedDivs
        isActive={props.settings.isInputNested}
        hasDeepInput={props.settings.isInputNestedWithDeepInput}
        hasRandomText={props.settings.isInputNestedWithRandomText}
        hasShallowInput={props.settings.isInputNestedWithShallowInput}
      >
        {renderField(props, label, labelShort)}
      </MaybeNestedDivs>
    </MaybeDivWrap>
  )
}
export default React.memo(genericField)

function renderField(props: Props, label: string, labelShort: string) {
  if (props.selectOptions) {
    return renderSelect(props, label, labelShort)
  } else {
    return renderInput(props, label, labelShort)
  }
}

function renderInput(props: Props, label: string, labelShort: string) {
  const TheInput = props.isPassword ? Input.Password : Input

  return (
    <>
      <TheInput
        style={FIELD_STYLE}
        id={`${props.settings.areAttrIdentifying ? labelShort : ''}${props.iteration}`}
        placeholder={props.settings.areAttrIdentifying ? label : ''}
        value={props.value}
        onChange={e => props.valueSetter(e.target.value)}
      />
      {props.settings.isAdjacentInput && (
        <input type="text" className="ant-input" style={FIELD_STYLE} />
      )}
      {props.settings.isDeeperInput && (
        <Div>
          <input type="text" className="ant-input" style={FIELD_STYLE} />
        </Div>
      )}
    </>
  )
}

function renderSelect(props: Props, label: string, labelShort: string) {
  if (!props.selectOptions) return null

  return (
    <>
      {props.isSelectAntd ? (
        <Select
          id={`${props.settings.areAttrIdentifying ? labelShort : ''}${props.iteration}`}
          value={props.value}
          onChange={(val: string) => props.valueSetter(val)}
          style={{width: '100%'}}
        >
          {props.selectOptions.map(x => (
            <Select.Option key={x.value} value={x.value}>
              {x.label}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <select
          id={`${props.settings.areAttrIdentifying ? labelShort : ''}${props.iteration}`}
          value={props.value}
          onChange={(e: any) => props.valueSetter(e.target.value)}
          className="ant-select-selection"
          style={{width: '100%', height: '100%'}}
        >
          {props.selectOptions.map(x => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
      )}
      {props.settings.isAdjacentInput && (
        <input type="text" className="ant-input" style={FIELD_STYLE} />
      )}
      {props.settings.isDeeperInput && (
        <Div>
          <input type="text" className="ant-input" style={FIELD_STYLE} />
        </Div>
      )}
    </>
  )
}
