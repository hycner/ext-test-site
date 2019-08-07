import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsLogin} from '../../modules/settings/redux'
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
  settings: StoreSettingsLogin
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
      ...(props.settings.isThreeField && {accountId}),
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

  let Form = props.settings.isForm ? RealForm : FakeForm
  let Fieldset = props.settings.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.settings.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.settings.isThreeField && (
            <GenericField
              iteration={iteration}
              labelKey="accountId"
              messages={messages}
              settings={props.settings}
              value={accountId}
              valueSetter={setAccountId}
            />
          )}

          {props.settings.is2FA && (
            <GenericField
              iteration={iteration}
              labelKey="twoFA"
              messages={messages}
              settings={props.settings}
              value={twoFA}
              valueSetter={setTwoFA}
            />
          )}

          <GenericField
            iteration={iteration}
            labelKey="username"
            messages={messages}
            settings={props.settings}
            value={username}
            valueSetter={setUsername}
          />

          <GenericField
            isPassword={true}
            iteration={iteration}
            labelKey="password"
            messages={messages}
            settings={props.settings}
            value={password}
            valueSetter={setPassword}
          />

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
  const settings = state.settings.login

  return {
    settings,
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
