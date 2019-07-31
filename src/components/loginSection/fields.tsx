import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import MaybeDivs from '../_maybeDivs'
import MaybeLabel from '../_maybeLabel'

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
  isFieldset: boolean
  isForm: boolean
  isInputNested: boolean
  isInputNestedWithRandomText: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isMultiButton: boolean
  isThreeField: boolean
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
            <>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.accountId}
                {...(props.isLabelledWithFor && {
                  target: `${messages.accountId_short}${iteration}`,
                })}
              />
              <MaybeDivs isActive={props.isInputNested} hasRandomText={props.isInputNestedWithRandomText}>
                <Input
                  style={FIELD_STYLE}
                  id={`${props.areAttrIdentifying ? messages.accountId_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.accountId : ''}
                  value={accountId}
                  onChange={e => setAccountId(e.target.value)}
                />
              </MaybeDivs>
            </>
          )}

          {props.is2FA && (
            <>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.twoFA}
                {...(props.isLabelledWithFor && {
                  target: `${messages.twoFA_short}${iteration}`,
                })}
              />
              <MaybeDivs isActive={props.isInputNested} hasRandomText={props.isInputNestedWithRandomText}>
                <Input
                  style={FIELD_STYLE}
                  id={`${props.areAttrIdentifying ? messages.twoFA_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.twoFA : ''}
                  value={twoFA}
                  onChange={e => setTwoFA(e.target.value)}
                />
              </MaybeDivs>
            </>
          )}

          <MaybeLabel
            isActive={props.isLabelled}
            isOnlyText={props.isLabelledOnlyText}
            label={messages.username}
            {...(props.isLabelledWithFor && {target: `${messages.username_short}${iteration}`})}
          />
          <MaybeDivs isActive={props.isInputNested} hasRandomText={props.isInputNestedWithRandomText}>
            <Input
              style={FIELD_STYLE}
              id={`${props.areAttrIdentifying ? messages.username_short : ''}${iteration}`}
              placeholder={props.areAttrIdentifying ? messages.username : ''}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </MaybeDivs>

          <MaybeLabel
            isActive={props.isLabelled}
            isOnlyText={props.isLabelledOnlyText}
            label={messages.password}
            {...(props.isLabelledWithFor && {target: `${messages.password_short}${iteration}`})}
          />
          <MaybeDivs isActive={props.isInputNested} hasRandomText={props.isInputNestedWithRandomText}>
            <Input.Password
              style={FIELD_STYLE}
              id={`${props.areAttrIdentifying ? messages.password_short : ''}${iteration}`}
              placeholder={props.areAttrIdentifying ? messages.password : ''}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </MaybeDivs>

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
    isFieldset: settings.isFieldset,
    isForm: settings.isForm,
    isInputNested: settings.isInputNested,
    isInputNestedWithRandomText: settings.isInputNestedWithRandomText,
    isIframeSection: settings.isIframeSection,
    isLabelled: settings.isLabelled,
    isLabelledOnlyText: settings.isLabelledOnlyText,
    isLabelledWithFor: settings.isLabelledWithFor,
    isThreeField: settings.isThreeField,
    isMultiButton: settings.isMultiButton,
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
