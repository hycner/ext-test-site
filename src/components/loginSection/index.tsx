import React, {useState} from 'react';
import styled from 'styled-components';
import {Icon, Tooltip} from 'antd';

import LoginFields from './loginFields'
import ConfigMenu from './configMenu'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;
const Header = styled.div`
  font-size: 16px;
`;
const SecondRow = styled.div`
  margin-top: 3px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
`;

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
};

type TProps = {};

export default function LoginSection(props: TProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [iterations, setIterations] = useState<number>(1);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }
  function increaseIterations() {
    setIterations(iterations + 1);
  }
  function decreaseIterations() {
    if (iterations > 1) {
      setIterations(iterations - 1);
    }
  }
  function renderIterations() {
    const iNodes = []
    for (let i=0; i < iterations; i++) {
      iNodes.push(
        <LoginFields iteration={i+1} key={i} />
      )
    }
    return iNodes
  }

  return (
    <Wrap>
      <Header>
        <div>
          <Icon
            type={isVisible ? 'eye' : 'eye-invisible'}
            theme="filled"
            style={ICON_STYLE}
            onClick={toggleVisibility}
          />
          &nbsp;
          Login Fields
          &nbsp;
          <Tooltip title="Fake login fields available for Keeper's extension to target.">
            <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
          </Tooltip>
        </div>

        <SecondRow>
          <Icon
            type="plus-circle"
            theme="filled"
            style={ICON_STYLE}
            onClick={increaseIterations}
          />
          <Icon
            type="minus-circle"
            theme="filled"
            style={ICON_STYLE}
            onClick={decreaseIterations}
          />
          <ConfigMenu />
        </SecondRow>
      </Header>

      {isVisible && renderIterations()}
    </Wrap>
  );
}
