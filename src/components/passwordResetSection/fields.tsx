import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import MaybeLabel from '../_maybeLabel'
import MaybeDivWrap from '../_maybeDivWrap'
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
  hasConfirmNew: boolean
  hasConfirmOld: boolean
  hasEmail: boolean
  isAdjacentInput: boolean
  isFieldset: boolean
  isForm: boolean
  isInputNested: boolean
  isInputNestedWithDeepInput: boolean
  isInputNestedWithRandomText: boolean
  isInputNestedWithShallowInput: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isMultiButton: boolean
  isWrappedInDiv: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [email, setEmail] = useState<string>('')
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function onSubmit(e: any): void {
    e.preventDefault()
    console.log(`Password Reset (${props.iteration}) submit clicked`)
    console.log({
      ...(props.hasEmail && {email}),
      ...(props.hasConfirmOld && {oldPassword}),
      newPassword,
      ...(props.hasConfirmNew && {confirmNewPassword}),
    })
  }

  function onClear(): void {
    console.log(`Password Reset (${props.iteration}) clear clicked`)
    setEmail('')
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  function onNothing(): void {
    console.log(`Password Reset (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm
  let Fieldset = props.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.hasEmail && (
            <MaybeDivWrap isActive={props.isWrappedInDiv}>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.email}
                {...(props.isLabelledWithFor && {target: `${messages.email_short}${iteration}`})}
              />
              <MaybeNestedDivs
                isActive={props.isInputNested}
                hasDeepInput={props.isInputNestedWithDeepInput}
                hasRandomText={props.isInputNestedWithRandomText}
                hasShallowInput={props.isInputNestedWithShallowInput}
              >
                <Input
                  style={FIELD_STYLE}
                  id={`${props.areAttrIdentifying ? messages.email_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.email : ''}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {props.isAdjacentInput && <input type="text" className="ant-input" style={FIELD_STYLE} />}
              </MaybeNestedDivs>
            </MaybeDivWrap>
          )}

          {props.hasConfirmOld && (
            <MaybeDivWrap isActive={props.isWrappedInDiv}>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.oldPass}
                {...(props.isLabelledWithFor && {target: `${messages.oldPass_short}${iteration}`})}
              />
              <MaybeNestedDivs
                isActive={props.isInputNested}
                hasDeepInput={props.isInputNestedWithDeepInput}
                hasRandomText={props.isInputNestedWithRandomText}
                hasShallowInput={props.isInputNestedWithShallowInput}
              >
                <Input.Password
                  style={FIELD_STYLE}
                  id={`${props.areAttrIdentifying ? messages.oldPass_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.oldPass : ''}
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
                {props.isAdjacentInput && <input type="text" className="ant-input" style={FIELD_STYLE} />}
              </MaybeNestedDivs>
            </MaybeDivWrap>
          )}

          <MaybeDivWrap isActive={props.isWrappedInDiv}>
            <MaybeLabel
              isActive={props.isLabelled}
              isOnlyText={props.isLabelledOnlyText}
              label={messages.newPass}
              {...(props.isLabelledWithFor && {target: `${messages.newPass_short}${iteration}`})}
            />
            <MaybeNestedDivs
              isActive={props.isInputNested}
              hasDeepInput={props.isInputNestedWithDeepInput}
              hasRandomText={props.isInputNestedWithRandomText}
              hasShallowInput={props.isInputNestedWithShallowInput}
            >
              <Input.Password
                style={FIELD_STYLE}
                id={`${props.areAttrIdentifying ? messages.newPass_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.newPass : ''}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              {props.isAdjacentInput && <input type="text" className="ant-input" style={FIELD_STYLE} />}
            </MaybeNestedDivs>
          </MaybeDivWrap>

          {props.hasConfirmNew && (
            <MaybeDivWrap isActive={props.isWrappedInDiv}>
              <MaybeLabel
                isActive={props.isLabelled}
                isOnlyText={props.isLabelledOnlyText}
                label={messages.confirmNewPass}
                {...(props.isLabelledWithFor && {
                  target: `${messages.confirmNewPass_short}${iteration}`,
                })}
              />
              <MaybeNestedDivs
                isActive={props.isInputNested}
                hasDeepInput={props.isInputNestedWithDeepInput}
                hasRandomText={props.isInputNestedWithRandomText}
                hasShallowInput={props.isInputNestedWithShallowInput}
              >
                <Input.Password
                  style={FIELD_STYLE}
                  id={`${
                    props.areAttrIdentifying ? messages.confirmNewPass_short : ''
                  }${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.confirmNewPass : ''}
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                />
                {props.isAdjacentInput && <input type="text" className="ant-input" style={FIELD_STYLE} />}
              </MaybeNestedDivs>
            </MaybeDivWrap>
          )}

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
  const settings = state.settings.passwordReset

  return {
    areAttrIdentifying: settings.areAttrIdentifying,
    areIdsUnique: settings.areIdsUnique,
    hasConfirmNew: settings.hasConfirmNew,
    hasConfirmOld: settings.hasConfirmOld,
    hasEmail: settings.hasEmail,
    isAdjacentInput: settings.isAdjacentInput,
    isFieldset: settings.isFieldset,
    isForm: settings.isForm,
    isInputNested: settings.isInputNested,
    isInputNestedWithDeepInput: settings.isInputNestedWithDeepInput,
    isInputNestedWithRandomText: settings.isInputNestedWithRandomText,
    isInputNestedWithShallowInput: settings.isInputNestedWithShallowInput,
    isIframeSection: settings.isIframeSection,
    isLabelled: settings.isLabelled,
    isLabelledOnlyText: settings.isLabelledOnlyText,
    isLabelledWithFor: settings.isLabelledWithFor,
    isMultiButton: settings.isMultiButton,
    isWrappedInDiv: settings.isWrappedInDiv,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'passwordReset' && {
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
