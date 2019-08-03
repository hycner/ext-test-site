import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import MaybeDivWrap from '../_maybeDivWrap'
import MaybeLabel from '../_maybeLabel'
import MaybeNestedDivs from '../_maybeNestedDivs'

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
            <MaybeDivWrap isActive={props.isWrappedInDiv}>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.accountId}
                {...(props.isLabelledWithFor && {
                  target: `${messages.accountId_short}${iteration}`,
                })}
              />
              <MaybeNestedDivs
                isActive={props.isInputNested}
                hasDeepInput={props.isInputNestedWithDeepInput}
                hasRandomText={props.isInputNestedWithRandomText}
                hasShallowInput={props.isInputNestedWithShallowInput}
              >
                <Input
                  style={FIELD_STYLE}
                  id={`${props.areAttrIdentifying ? messages.accountId_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.accountId : ''}
                  value={accountId}
                  onChange={e => setAccountId(e.target.value)}
                />
                {props.isAdjacentInput && (
                  <input type="text" className="ant-input" style={FIELD_STYLE} />
                )}
              </MaybeNestedDivs>
            </MaybeDivWrap>
          )}

          {props.is2FA && (
            <MaybeDivWrap isActive={props.isWrappedInDiv}>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.twoFA}
                {...(props.isLabelledWithFor && {
                  target: `${messages.twoFA_short}${iteration}`,
                })}
              />
              <MaybeNestedDivs
                isActive={props.isInputNested}
                hasDeepInput={props.isInputNestedWithDeepInput}
                hasRandomText={props.isInputNestedWithRandomText}
                hasShallowInput={props.isInputNestedWithShallowInput}
              >
                <Input
                  style={FIELD_STYLE}
                  id={`${props.areAttrIdentifying ? messages.twoFA_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.twoFA : ''}
                  value={twoFA}
                  onChange={e => setTwoFA(e.target.value)}
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
          )}

          <MaybeDivWrap isActive={props.isWrappedInDiv}>
            <MaybeLabel
              isActive={props.isLabelled}
              isOnlyText={props.isLabelledOnlyText}
              label={messages.username}
              {...(props.isLabelledWithFor && {target: `${messages.username_short}${iteration}`})}
            />
            <MaybeNestedDivs
              isActive={props.isInputNested}
              hasDeepInput={props.isInputNestedWithDeepInput}
              hasRandomText={props.isInputNestedWithRandomText}
              hasShallowInput={props.isInputNestedWithShallowInput}
            >
              <Input
                style={FIELD_STYLE}
                id={`${props.areAttrIdentifying ? messages.username_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.username : ''}
                value={username}
                onChange={e => setUsername(e.target.value)}
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
              label={messages.password}
              {...(props.isLabelledWithFor && {target: `${messages.password_short}${iteration}`})}
            />
            <MaybeNestedDivs
              isActive={props.isInputNested}
              hasDeepInput={props.isInputNestedWithDeepInput}
              hasRandomText={props.isInputNestedWithRandomText}
              hasShallowInput={props.isInputNestedWithShallowInput}
            >
              <Input.Password
                style={FIELD_STYLE}
                id={`${props.areAttrIdentifying ? messages.password_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.password : ''}
                value={password}
                onChange={e => setPassword(e.target.value)}
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
