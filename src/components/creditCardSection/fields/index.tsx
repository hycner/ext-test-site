import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input, Radio} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../../modules/rootReducer'
import Expiration from './expiration'
import MaybeDivWrap from '../../_maybeDivWrap'
import MaybeLabel from '../../_maybeLabel'
import MaybeNestedDivs from '../../_maybeNestedDivs'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`
const FormatWrap = styled.div`
  margin-top: 2px;
`
const ButtonsWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`
const Div = styled.div`
  width: 100%;
`

const FIELD_STYLE = {
  marginLeft: 2,
  marginRight: 2,
  marginBottom: 5,
}
const BTN_STYLE = {
  marginLeft: 2,
  marginRight: 2,
}

type Props = {
  areAttrIdentifying: boolean
  areIdsUnique: boolean
  isAdjacentInput: boolean
  isFieldset: boolean
  isForm: boolean
  isInputNested: boolean
  isInputNestedWithDeepInput: boolean
  isDeeperInput: boolean
  isInputNestedWithRandomText: boolean
  isInputNestedWithShallowInput: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isMultiButton: boolean
  isWrappedInDiv: boolean
  iteration: number
}

const Index: React.FC<Props> = props => {
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')
  const [expDateFull, setExpDateFull] = useState<string>('')
  const [expMonth, setExpMonth] = useState<string>('')
  const [expYear, setExpYear] = useState<string>('')
  const [dateFormat, setDateFormat] = useState<string>('string')
  const [name, setName] = useState<string>('')

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function changeDateFormat(e: any) {
    setDateFormat(e.target.value)
  }

  function onSubmit(e: any): void {
    e.preventDefault()
    console.log(`Credit card (${props.iteration}) save clicked`)
    console.log({cardNumber, cvv, expDateFull, expMonth, expYear, dateFormat, name})
  }

  function onClear(): void {
    console.log(`Credit card (${props.iteration}) clear clicked`)
    setCardNumber('')
    setCvv('')
    setExpDateFull('')
    setExpMonth('')
    setExpYear('')
    setName('')
  }

  function onNothing(): void {
    console.log(`Credit card (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm
  let Fieldset = props.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          <MaybeDivWrap isActive={props.isWrappedInDiv}>
            <MaybeLabel
              isActive={props.isLabelled}
              isOnlyText={props.isLabelledOnlyText}
              label={messages.name}
              {...(props.isLabelledWithFor && {target: `${messages.name_short}${iteration}`})}
            />
            <MaybeNestedDivs
              isActive={props.isInputNested}
              hasDeepInput={props.isInputNestedWithDeepInput}
              hasRandomText={props.isInputNestedWithRandomText}
              hasShallowInput={props.isInputNestedWithShallowInput}
            >
              <Input
                id={`${props.areAttrIdentifying ? messages.name_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.name : ''}
                style={FIELD_STYLE}
                value={name}
                onChange={e => setName(e.target.value)}
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

          <MaybeDivWrap isActive={props.isWrappedInDiv}>
            <MaybeLabel
              isActive={props.isLabelled}
              isOnlyText={props.isLabelledOnlyText}
              label={messages.number}
              {...(props.isLabelledWithFor && {target: `${messages.number_short}${iteration}`})}
            />
            <MaybeNestedDivs
              isActive={props.isInputNested}
              hasDeepInput={props.isInputNestedWithDeepInput}
              hasRandomText={props.isInputNestedWithRandomText}
              hasShallowInput={props.isInputNestedWithShallowInput}
            >
              <Input
                id={`${props.areAttrIdentifying ? messages.number_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.number : ''}
                style={FIELD_STYLE}
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
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

          <div style={{display: 'flex'}}>
            <div style={FIELD_STYLE}>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.cvv}
                {...(props.isLabelledWithFor && {target: `${messages.cvv_short}${iteration}`})}
              />
              <MaybeNestedDivs
                isActive={props.isInputNested}
                hasDeepInput={props.isInputNestedWithDeepInput}
                hasRandomText={props.isInputNestedWithRandomText}
                hasShallowInput={props.isInputNestedWithShallowInput}
              >
                <Input
                  id={`${props.areAttrIdentifying ? messages.cvv_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.cvv : ''}
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
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
            </div>

            <Expiration
              areAttrIdentifying={props.areAttrIdentifying}
              dateFormat={dateFormat}
              expDateFull={expDateFull}
              expMonth={expMonth}
              expYear={expYear}
              isAdjacentInput={props.isAdjacentInput}
              isInputNested={props.isInputNested}
              isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
              isDeeperInput={props.isDeeperInput}
              isInputNestedWithRandomText={props.isInputNestedWithRandomText}
              isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
              isLabelled={props.isLabelled}
              isLabelledOnlyText={props.isLabelledOnlyText}
              isLabelledWithFor={props.isLabelledWithFor}
              isWrappedInDiv={props.isWrappedInDiv}
              iteration={iteration}
              setExpDateFull={setExpDateFull}
              setExpMonth={setExpMonth}
              setExpYear={setExpYear}
            />
          </div>

          <FormatWrap>
            <div>Expiration Format:</div>
            <Radio.Group onChange={changeDateFormat} value={dateFormat}>
              <Radio value="string">String</Radio>
              <Radio value="select">Select</Radio>
              <Radio value="non-standard">Non-Standard</Radio>
            </Radio.Group>
          </FormatWrap>

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              {messages.save}
            </Button>
            {props.isMultiButton && (
              <>
                <Button style={BTN_STYLE} onClick={onClear} htmlType="reset">
                  {messages.clear}
                </Button>
                <Button style={BTN_STYLE} onClick={onNothing} htmlType="button">
                  {messages.nothing}
                </Button>
              </>
            )}
          </ButtonsWrap>
        </Wrap>
      </Fieldset>
    </Form>
  )
}

function mapStateToProps(state: Store) {
  const settings = state.settings.creditCard

  return {
    areAttrIdentifying: settings.areAttrIdentifying,
    areIdsUnique: settings.areIdsUnique,
    isAdjacentInput: settings.isAdjacentInput,
    isFieldset: settings.isFieldset,
    isForm: settings.isForm,
    isInputNested: settings.isInputNested,
    isInputNestedWithDeepInput: settings.isInputNestedWithDeepInput,
    isDeeperInput: settings.isDeeperInput,
    isInputNestedWithRandomText: settings.isInputNestedWithRandomText,
    isInputNestedWithShallowInput: settings.isInputNestedWithShallowInput,
    isLabelled: settings.isLabelled,
    isLabelledOnlyText: settings.isLabelledOnlyText,
    isLabelledWithFor: settings.isLabelledWithFor,
    isMultiButton: settings.isMultiButton,
    isWrappedInDiv: settings.isWrappedInDiv,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'creditCard' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(React.memo(Index))

// Helper functions

type ChildProps = {
  children: any
}
function RealForm(props: ChildProps) {
  return <form>{props.children}</form>
}
function FakeForm(props: ChildProps) {
  return <>{props.children}</>
}
function RealFieldset(props: ChildProps) {
  return <fieldset>{props.children}</fieldset>
}
function FakeFieldset(props: ChildProps) {
  return <>{props.children}</>
}
