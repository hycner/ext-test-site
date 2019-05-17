import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Input} from 'antd';

const Wrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PASSWORD_STYLE = {
  marginTop: 5,
  marginBottom: 5,
};

type TProps = {
  areIdsUnique: boolean
  isForm: boolean
  iteration: number
};

export default function LoginFields(props: TProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onSubmit() {
    console.log(`login(${props.iteration}) clicked`);
    console.log({
      username,
      password,
    });
  }

  let Form = props.isForm ? RealForm : FakeForm

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Wrap>
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
        <Button
          id={`login${iteration}`}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Wrap>
    </Form>
  );
}

type FormProps = {
  children: any
}
function RealForm(props: FormProps) {
  return (
    <form>
      {props.children}
    </form>
  )
}
function FakeForm(props: FormProps) {
  return (
    <>
      {props.children}
    </>
  )
}