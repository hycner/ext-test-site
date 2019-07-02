import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
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
  areIdsUnique: boolean
  hasConfirmNew: boolean
  hasConfirmOld: boolean
  hasEmail: boolean
  isFieldset: boolean
  isForm: boolean
  isLabelled: boolean
  isLabelledWithFor: boolean
  isMultiButton: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [email, setEmail] = useState<string>('')
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

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
            <>
              <MaybeLabel
                isActive={props.isLabelled}
                label="Email"
                {...(props.isLabelledWithFor && {target: `psEmail${iteration}`})}
              />
              <Input
                style={FIELD_STYLE}
                id={`psEmail${iteration}`}
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </>
          )}

          {props.hasConfirmOld && (
            <>
              <MaybeLabel
                isActive={props.isLabelled}
                label="Current Password"
                {...(props.isLabelledWithFor && {target: `oldPassword${iteration}`})}
              />
              <Input.Password
                style={FIELD_STYLE}
                id={`oldPassword${iteration}`}
                placeholder="Current Password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </>
          )}

          <MaybeLabel
            isActive={props.isLabelled}
            label="New Password"
            {...(props.isLabelledWithFor && {target: `newPassword${iteration}`})}
          />
          <Input.Password
            style={FIELD_STYLE}
            id={`newPassword${iteration}`}
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          {props.hasConfirmNew && (
            <>
              <MaybeLabel
                isActive={props.isLabelled}
                label="Confirm New Password"
                {...(props.isLabelledWithFor && {target: `confirmNewPassword${iteration}`})}
              />
              <Input.Password
                style={FIELD_STYLE}
                id={`confirmNewPassword${iteration}`}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
              />
            </>
          )}

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              Submit
            </Button>
            {props.isMultiButton && (
              <>
                <Button style={BTN_STYLE} onClick={onClear} htmlType="reset">
                  Clear
                </Button>
                <Button style={BTN_STYLE} onClick={onNothing} htmlType="button">
                  Nothing
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
  const prSettings = state.settings.passwordReset

  return {
    areIdsUnique: prSettings.areIdsUnique,
    hasConfirmNew: prSettings.hasConfirmNew,
    hasConfirmOld: prSettings.hasConfirmOld,
    hasEmail: prSettings.hasEmail,
    isFieldset: prSettings.isFieldset,
    isForm: prSettings.isForm,
    isIframeSection: prSettings.isIframeSection,
    isLabelled: prSettings.isLabelled,
    isLabelledWithFor: prSettings.isLabelledWithFor,
    isMultiButton: prSettings.isMultiButton,
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
