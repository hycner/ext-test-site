import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Radio} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../../modules/rootReducer'
import Expiration from './expiration'
import GenericInput from '../../_genericInput'

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
          <GenericInput
            areAttrIdentifying={props.areAttrIdentifying}
            isAdjacentInput={props.isAdjacentInput}
            isDeeperInput={props.isDeeperInput}
            isInputNested={props.isInputNested}
            isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
            isInputNestedWithRandomText={props.isInputNestedWithRandomText}
            isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
            isLabelled={props.isLabelled}
            isLabelledOnlyText={props.isLabelledOnlyText}
            isLabelledWithFor={props.isLabelledWithFor}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={iteration}
            labelKey="name"
            messages={messages}
            value={name}
            valueSetter={setName}
          />

          <GenericInput
            areAttrIdentifying={props.areAttrIdentifying}
            isAdjacentInput={props.isAdjacentInput}
            isDeeperInput={props.isDeeperInput}
            isInputNested={props.isInputNested}
            isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
            isInputNestedWithRandomText={props.isInputNestedWithRandomText}
            isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
            isLabelled={props.isLabelled}
            isLabelledOnlyText={props.isLabelledOnlyText}
            isLabelledWithFor={props.isLabelledWithFor}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={iteration}
            labelKey="number"
            messages={messages}
            value={cardNumber}
            valueSetter={setCardNumber}
          />

          <div style={{display: 'flex'}}>
            <GenericInput
              areAttrIdentifying={props.areAttrIdentifying}
              isAdjacentInput={props.isAdjacentInput}
              isDeeperInput={props.isDeeperInput}
              isInputNested={props.isInputNested}
              isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
              isInputNestedWithRandomText={props.isInputNestedWithRandomText}
              isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
              isLabelled={props.isLabelled}
              isLabelledOnlyText={props.isLabelledOnlyText}
              isLabelledWithFor={props.isLabelledWithFor}
              isWrappedInDiv={props.isWrappedInDiv}
              iteration={iteration}
              labelKey="cvv"
              messages={messages}
              value={cvv}
              valueSetter={setCvv}
            />

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
