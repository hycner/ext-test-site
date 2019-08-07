import React from 'react'
import styled from 'styled-components'
import {Input, Select} from 'antd'

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
  areAttrIdentifying: boolean
  isAdjacentInput: boolean
  isDeeperInput: boolean
  isInputNested: boolean
  isInputNestedWithDeepInput: boolean
  isInputNestedWithRandomText: boolean
  isInputNestedWithShallowInput: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isPassword?: boolean
  isSelectAntd?: boolean
  isWrappedInDiv: boolean
  iteration: number | string
  labelKey: string
  messages: {[key: string]: string}
  selectOptions?: Array<{label: string, value: string}>
  value: string
  valueSetter: (value: string) => void
}

const genericField: React.FC<Props> = props => {
  const label = props.messages[props.labelKey]
  const labelShort = props.messages[`${[props.labelKey]}_short`]

  return (
    <MaybeDivWrap isActive={props.isWrappedInDiv}>
      <MaybeLabel
        isActive={props.isLabelled}
        isOnlyText={props.isLabelledOnlyText}
        label={label}
        {...(props.isLabelledWithFor && {target: `${labelShort}${props.iteration}`})}
      />
      <MaybeNestedDivs
        isActive={props.isInputNested}
        hasDeepInput={props.isInputNestedWithDeepInput}
        hasRandomText={props.isInputNestedWithRandomText}
        hasShallowInput={props.isInputNestedWithShallowInput}
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
        id={`${props.areAttrIdentifying ? labelShort : ''}${props.iteration}`}
        placeholder={props.areAttrIdentifying ? label : ''}
        value={props.value}
        onChange={e => props.valueSetter(e.target.value)}
      />
      {props.isAdjacentInput && (
        <input type="text" className="ant-input" style={FIELD_STYLE} />
      )}
      {props.isDeeperInput && (
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
      {props.isSelectAntd
        ? (
          <Select
            id={`${props.areAttrIdentifying ? labelShort : ''}${props.iteration}`}
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
            id={`${props.areAttrIdentifying ? labelShort : ''}${props.iteration}`}
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
        )
      }
      {props.isAdjacentInput && (
        <input type="text" className="ant-input" style={FIELD_STYLE} />
      )}
      {props.isDeeperInput && (
        <Div>
          <input type="text" className="ant-input" style={FIELD_STYLE} />
        </Div>
      )}
    </>
  )
}