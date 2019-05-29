import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'

const Wrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ACCOUNT_ID_STYLE = {
  marginBottom: 5,
}
const PASSWORD_STYLE = {
  marginTop: 5,
  marginBottom: 5,
}

type Props = {
  areIdsUnique: boolean
  isForm: boolean
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

  let Form = props.isForm ? RealForm : FakeForm

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Wrap>
        {props.isThreeField && (
          <Input
            style={ACCOUNT_ID_STYLE}
            id={`accountId${iteration}`}
            placeholder="Account ID"
            value={accountId}
            onChange={e => setAccountId(e.target.value)}
          />
        )}
        <Input
          id={`username${iteration}`}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input.Password
          style={PASSWORD_STYLE}
          id={`password${iteration}`}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button id={`login${iteration}`} onClick={onSubmit}>
          Submit
        </Button>
      </Wrap>
    </Form>
  )
}
export default Fields

type FormProps = {
  children: any
}
function RealForm(props: FormProps) {
  return <form>{props.children}</form>
}
function FakeForm(props: FormProps) {
  return <>{props.children}</>
}
