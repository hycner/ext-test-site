import React, {useState} from 'react';
import styled from 'styled-components';
import {Icon, Tooltip} from 'antd';

import Fields from './fields';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 300px;
`;

const Header = styled.div`
  font-size: 16px;
`;

const ICON_STYLE = {
  fontSize: 18,
};

type TProps = {};

export default function CreditCardFields2 (props: TProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <Wrap>
      <Header>
        <Icon
          type={isVisible ? 'eye' : 'eye-invisible'}
          onClick={() => setIsVisible(!isVisible)}
          theme="filled"
          style={ICON_STYLE}
        />
        &nbsp; Credit Card Fields &nbsp;
        <Tooltip title="Fake credit card fields available for Keeper's extension to target.">
          <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
        </Tooltip>
      </Header>

      {isVisible && <Fields />}
    </Wrap>
  );
}