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
  isForm: boolean
  isLabelled: boolean
  isMultiButton: boolean
  isThreeField: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [accountId, setAccountId] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  function onSubmit() {
    console.log(`Login (${props.iteration}) submit clicked`)
    console.log({
      username,
      password,
      ...(props.isThreeField && {accountId}),
    })
  }

  function onClear() {
    console.log(`Login (${props.iteration}) clear clicked`)
    setAccountId('')
    setUsername('')
    setPassword('')
  }

  function onNothing() {
    console.log(`Login (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Wrap>
        {props.isThreeField && (
          <>
            <MaybeLabel
              isActive={props.isLabelled}
              label="Account ID"
              target={`accountId${iteration}`}
            />
            <Input
              style={FIELD_STYLE}
              id={`accountId${iteration}`}
              placeholder="Account ID"
              value={accountId}
              onChange={e => setAccountId(e.target.value)}
            />
          </>
        )}

        <MaybeLabel isActive={props.isLabelled} label="Username" target={`username${iteration}`} />
        <Input
          style={FIELD_STYLE}
          id={`username${iteration}`}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <MaybeLabel isActive={props.isLabelled} label="Password" target={`password${iteration}`} />
        <Input.Password
          style={FIELD_STYLE}
          id={`password${iteration}`}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

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
  const lSettings = state.settings.login

  return {
    areIdsUnique: lSettings.areIdsUnique,
    isForm: lSettings.isForm,
    isIframeSection: lSettings.isIframeSection,
    isLabelled: lSettings.isLabelled,
    isThreeField: lSettings.isThreeField,
    isMultiButton: lSettings.isMultiButton,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'login' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(Fields)

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
