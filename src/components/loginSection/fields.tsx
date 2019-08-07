import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import GenericField from '../_genericField'

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
  is2FA: boolean
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
  isThreeField: boolean
  isWrappedInDiv: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [accountId, setAccountId] = useState<string>('')
  const [twoFA, setTwoFA] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function onSubmit(e: any): void {
    e.preventDefault()
    console.log(`Login (${props.iteration}) submit clicked`)
    console.log({
      username,
      password,
      ...(props.isThreeField && {accountId}),
    })
  }

  function onClear(): void {
    console.log(`Login (${props.iteration}) clear clicked`)
    setAccountId('')
    setUsername('')
    setPassword('')
  }

  function onNothing(): void {
    console.log(`Login (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm
  let Fieldset = props.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.isThreeField && (
            <GenericField
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
              labelKey="accountId"
              messages={messages}
              value={accountId}
              valueSetter={setAccountId}
            />
          )}

          {props.is2FA && (
            <GenericField
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
              labelKey="twoFA"
              messages={messages}
              value={twoFA}
              valueSetter={setTwoFA}
            />
          )}

          <GenericField
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
            labelKey="username"
            messages={messages}
            value={username}
            valueSetter={setUsername}
          />

          <GenericField
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
            isPassword={true}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={iteration}
            labelKey="password"
            messages={messages}
            value={password}
            valueSetter={setPassword}
          />

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              {messages.submit}
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
  const settings = state.settings.login

  return {
    areAttrIdentifying: settings.areAttrIdentifying,
    areIdsUnique: settings.areIdsUnique,
    is2FA: settings.is2FA,
    isAdjacentInput: settings.isAdjacentInput,
    isFieldset: settings.isFieldset,
    isForm: settings.isForm,
    isInputNested: settings.isInputNested,
    isInputNestedWithDeepInput: settings.isInputNestedWithDeepInput,
    isDeeperInput: settings.isDeeperInput,
    isInputNestedWithRandomText: settings.isInputNestedWithRandomText,
    isInputNestedWithShallowInput: settings.isInputNestedWithShallowInput,
    isIframeSection: settings.isIframeSection,
    isLabelled: settings.isLabelled,
    isLabelledOnlyText: settings.isLabelledOnlyText,
    isLabelledWithFor: settings.isLabelledWithFor,
    isThreeField: settings.isThreeField,
    isMultiButton: settings.isMultiButton,
    isWrappedInDiv: settings.isWrappedInDiv,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'login' && {
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
