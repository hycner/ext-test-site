import React, {useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {TStore} from '../modules/rootReducer';
import {dispatch} from '../store';
import {bootstrap} from '../modules/app/redux/bootstrap';
import CreditCardFields from './creditCardFields';
import IFrameSpawner from './iframeSpawner';
import LoginFields from './loginFields';
import TestRunner from './testRunner';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Header = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 26px;
`;

type TProps = {
  isBootstrapDone: boolean;
};

export function App(props: TProps) {
  useEffect(() => {
    setTimeout(() => {
      dispatch(bootstrap());
    }, 1000);
  }, []);

  return (
    <Wrap>
      <Header>Extension Security Tester</Header>

      <TestRunner />
      <LoginFields />
      <CreditCardFields />
      <IFrameSpawner />
    </Wrap>
  );
}

function mapStateToProps(state: TStore) {
  return {
    isBootstrapDone: state.app.bootstrap.isDone,
  };
}

export default connect(mapStateToProps)(App);
