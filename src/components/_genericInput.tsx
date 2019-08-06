import React from 'react'
import styled from 'styled-components'
import {Input} from 'antd'

import MaybeDivWrap from './_maybeDivWrap'
import MaybeNestedDivs from './_maybeNestedDivs'
import MaybeLabel from './_maybeLabel'

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
  isWrappedInDiv: boolean
  iteration: number | string
  labelKey: string
  messages: {[key: string]: string}
  value: string
  valueSetter: (value: string) => void
}

const genericInput: React.FC<Props> = props => {
  const label = props.messages[props.labelKey]
  const labelShort = props.messages[`${[props.labelKey]}_short`]
  const TheInput = props.isPassword ? Input.Password : Input

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
      </MaybeNestedDivs>
    </MaybeDivWrap>
  )
}
export default React.memo(genericInput)