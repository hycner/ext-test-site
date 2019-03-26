import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Icon, Input, Tooltip} from 'antd';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const Header = styled.div`
  font-size: 16px;
`;

const ICON_STYLE = {
  fontSize: 18,
};
const PASSWORD_STYLE = {
  marginTop: 5,
  marginBottom: 5,
};

type TProps = {};

export default function LoginFields (props: TProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function toggleVisibility () {
    setIsVisible(!isVisible);
  }

  function onSubmit () {
    console.log('login clicked');
    console.log({
      isVisible,
      username,
      password,
    });
  }

  return (
    <Wrap>
      <Header>
        <Icon
          type={isVisible ? 'eye' : 'eye-invisible'}
          onClick={toggleVisibility}
          theme="filled"
          style={ICON_STYLE}
        />
        &nbsp; Login Fields &nbsp;
        <Tooltip title="Fake login fields available for Keeper's extension to target.">
          <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
        </Tooltip>
      </Header>

      {isVisible && (
        <>
          <Input
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input.Password
            style={PASSWORD_STYLE}
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button id="login" onClick={onSubmit}>
            Submit
          </Button>
        </>
      )}
    </Wrap>
  );
}
