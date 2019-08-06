import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import GenericInput from '../_genericInput'

const Wrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
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
  hasEmail: boolean
  hasName: boolean
  hasPhone: boolean
  isAdjacentInput: boolean
  isDeeperInput: boolean
  isFieldset: boolean
  isForm: boolean
  isInputNested: boolean
  isInputNestedWithDeepInput: boolean
  isInputNestedWithRandomText: boolean
  isInputNestedWithShallowInput: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isIframeField: boolean
  isMultiButton: boolean
  isWrappedInDiv: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [streetOne, setStreetOne] = useState<string>('')
  const [streetTwo, setStreetTwo] = useState<string>('')
  const [zip, setZip] = useState<string>('')

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function onSubmit(e: any): void {
    e.preventDefault()
    console.log(`Address (${props.iteration}) submit clicked`)
    console.log({
      city,
      country,
      ...(props.hasEmail && {email}),
      name,
      ...(props.hasPhone && {phone}),
      state,
      streetOne,
      streetTwo,
      zip,
    })
  }

  function onClear(): void {
    console.log(`Address (${props.iteration}) clear clicked`)
    setCity('')
    setCountry('')
    setEmail('')
    setName('')
    setPhone('')
    setState('')
    setStreetOne('')
    setStreetTwo('')
    setZip('')
  }

  function onNothing(): void {
    console.log(`Address (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm
  let Fieldset = props.isFieldset ? RealFieldset : FakeFieldset
  // todo: finish implementing field-level iframe or remove
  let IframeField = props.isIframeField ? RealIframeField : FakeIframeField

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.hasName && (
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
          )}

          <div style={{display: 'flex', width: '100%'}}>
            {props.hasEmail && (
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
                labelKey="email"
                messages={messages}
                value={email}
                valueSetter={setEmail}
              />
            )}

            {props.hasPhone && (
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
                labelKey="phone"
                messages={messages}
                value={phone}
                valueSetter={setPhone}
              />
            )}
          </div>

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
            labelKey="street1"
            messages={messages}
            value={streetOne}
            valueSetter={setStreetOne}
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
            labelKey="street2"
            messages={messages}
            value={streetTwo}
            valueSetter={setStreetTwo}
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
            labelKey="city"
            messages={messages}
            value={city}
            valueSetter={setCity}
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
              labelKey="state"
              messages={messages}
              value={state}
              valueSetter={setState}
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
              labelKey="zip"
              messages={messages}
              value={zip}
              valueSetter={setZip}
            />
          </div>

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
            labelKey="country"
            messages={messages}
            value={country}
            valueSetter={setCountry}
          />

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
  const settings = state.settings.address

  return {
    areAttrIdentifying: settings.areAttrIdentifying,
    areIdsUnique: settings.areIdsUnique,
    hasEmail: settings.hasEmail,
    hasName: settings.hasName,
    hasPhone: settings.hasPhone,
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
    isIframeField: settings.isIframeField,
    isMultiButton: settings.isMultiButton,
    isWrappedInDiv: settings.isWrappedInDiv,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'address' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(React.memo(Fields))

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
function RealIframeField(props: ChildProps) {
  return <iframe>{props.children}</iframe>
}
function FakeIframeField(props: ChildProps) {
  return <>{props.children}</>
}
