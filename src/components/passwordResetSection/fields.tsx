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
  isConfirmNew: boolean
  isConfirmOld: boolean
  isForm: boolean
  isLabelled: boolean
  isMultiButton: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

  function onSubmit() {
    console.log(`Password Reset (${props.iteration}) submit clicked`)
    console.log({
      ...(props.isConfirmOld && {oldPassword}),
      newPassword,
      ...(props.isConfirmNew && {confirmNewPassword}),
    })
  }

  function onClear() {
    console.log(`Password Reset (${props.iteration}) clear clicked`)
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  function onNothing() {
    console.log(`Password Reset (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Wrap>
        {props.isConfirmOld && (
          <>
            <MaybeLabel
              isActive={props.isLabelled}
              label="Current Password"
              target={`oldPassword${iteration}`}
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
          target={`newPassword${iteration}`}
        />
        <Input.Password
          style={FIELD_STYLE}
          id={`newPassword${iteration}`}
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />

        {props.isConfirmNew && (
          <>
            <MaybeLabel
              isActive={props.isLabelled}
              label="Confirm New Password"
              target={`confirmNewPassword${iteration}`}
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
    </Form>
  )
}

function mapStateToProps(state: Store) {
  const prSettings = state.settings.passwordReset

  return {
    areIdsUnique: prSettings.areIdsUnique,
    isConfirmNew: prSettings.isConfirmNew,
    isConfirmOld: prSettings.isConfirmOld,
    isForm: prSettings.isForm,
    isIframeSection: prSettings.isIframeSection,
    isLabelled: prSettings.isLabelled,
    isMultiButton: prSettings.isMultiButton,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'passwordReset' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(React.memo(Fields))

// Helper functions

type FormProps = {
  children: any
}
function RealForm(props: FormProps) {
  return <form>{props.children}</form>
}
function FakeForm(props: FormProps) {
  return <>{props.children}</>
}
