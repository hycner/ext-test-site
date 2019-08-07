import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsPasswordReset} from '../../modules/settings/redux'
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
  iteration: number
  settings: StoreSettingsPasswordReset
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
      ...(props.settings.hasEmail && {email}),
      ...(props.settings.hasConfirmOld && {oldPassword}),
      newPassword,
      ...(props.settings.hasConfirmNew && {confirmNewPassword}),
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

  let Form = props.settings.isForm ? RealForm : FakeForm
  let Fieldset = props.settings.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.settings.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.settings.hasEmail && (
            <GenericField
              iteration={iteration}
              labelKey="email"
              messages={messages}
              settings={props.settings}
              value={email}
              valueSetter={setEmail}
            />
          )}

          {props.settings.hasConfirmOld && (
            <GenericField
              isPassword={true}
              iteration={iteration}
              labelKey="oldPass"
              messages={messages}
              settings={props.settings}
              value={oldPassword}
              valueSetter={setOldPassword}
            />
          )}

          <GenericField
            isPassword={true}
            iteration={iteration}
            labelKey="newPass"
            messages={messages}
            settings={props.settings}
            value={newPassword}
            valueSetter={setNewPassword}
          />

          {props.settings.hasConfirmNew && (
            <GenericField
              isPassword={true}
              iteration={iteration}
              labelKey="confirmNewPass"
              messages={messages}
              settings={props.settings}
              value={confirmNewPassword}
              valueSetter={setConfirmNewPassword}
            />
          )}

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              {messages.submit}
            </Button>
            {props.settings.isMultiButton && (
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
    settings,
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
