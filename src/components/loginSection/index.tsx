import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Icon, Tooltip} from 'antd';
import localforage from 'localforage'

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

type LSConfig = {
  isVisible: boolean
  areIdsUnique: boolean
  iterations: number
}

const STATE_KEYS = ['isVisible', 'areIdsUnique', 'iterations']

type TProps = {};

export default function LoginSection(props: TProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [areIdsUnique, setAreIdsUnique] = useState<boolean>(true);
  const [iterations, setIterations] = useState<number>(1);

  useEffect(() => {
    // @ts-ignore
    localforage.getItem('loginSection').then((config: LSConfig) => {
      if (!config) return;

      // Wipe config if mismatched
      const isCfgMismatch = Object.keys(config).every(key => STATE_KEYS.includes(key))
      if (!isCfgMismatch) {
        console.log('Persisted config key mismatch. Wiping settings (probably new config schema)')
        return localforage.removeItem('loginSection')
      }

      // Persist config
      setIsVisible(config.isVisible)
      setAreIdsUnique(config.areIdsUnique)
      setIterations(config.iterations)
    })
  }, [])

  function persistSettings(changes: Object) {
    localforage.setItem('loginSection', {
      isVisible,
      areIdsUnique,
      iterations,
      ...changes,
    })
  }
  function toggleVisibility() {
    let newVal = !isVisible
    setIsVisible(newVal);
    persistSettings({isVisible: newVal})
  }
  function toggleUniqueIds () {
    let newVal = !areIdsUnique
    setAreIdsUnique(newVal)
    persistSettings({areIdsUnique: newVal})
  }
  function increaseIterations() {
    let newVal = iterations + 1
    setIterations(newVal);
    persistSettings({iterations: newVal})
  }
  function decreaseIterations() {
    if (iterations > 1) {
      let newVal = iterations - 1
      setIterations(newVal);
      persistSettings({iterations: newVal})
    }
  }

  function renderIterations() {
    const iNodes = []
    for (let i=0; i < iterations; i++) {
      iNodes.push(
        <LoginFields
          key={i}
          iteration={i+1}
          areIdsUnique={areIdsUnique}
        />
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
          <ConfigMenu
            areIdsUnique={areIdsUnique}
            toggleUniqueIds={toggleUniqueIds}
          />
        </SecondRow>
      </Header>

      {isVisible && renderIterations()}
    </Wrap>
  );
}
