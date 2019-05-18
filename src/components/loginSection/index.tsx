import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'
import localforage from 'localforage'

import LoginFields from './loginFields'
import ConfigMenu from './configMenu'
import {setConfig} from '../../modules/customization/redux';
import {dispatch} from '../../store';
import {TStore} from '../../modules/rootReducer';
import {TStoreCustomizationLogin} from '../../modules/customization/redux';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`
const Header = styled.div`
  font-size: 16px;
`
const SpecificSettings = styled.div`
  margin-top: 3px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
`

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
}

type LSConfig = {
  isVisible: boolean
  iterations: number
  areIdsUnique: boolean
  isForm: boolean
}

const STATE_KEYS = ['isVisible', 'iterations', 'areIdsUnique', 'isForm']

type TProps = {
  config: TStoreCustomizationLogin
}

function LoginSection(props: TProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [iterations, setIterations] = useState<number>(1)
  const [areIdsUnique, setAreIdsUnique] = useState<boolean>(true)
  const [isForm, setIsForm] = useState<boolean>(false)

  useEffect(() => {
    // @ts-ignore
    localforage.getItem('login').then((config: LSConfig) => {
      if (!config) return

      // Wipe config if mismatched
      const cfgKeys = Object.keys(config)
      if (cfgKeys.length !== STATE_KEYS.length) {
        return localforage.removeItem('login')
      }
      const isCfgMismatch = !cfgKeys.every(key => STATE_KEYS.includes(key))
      if (isCfgMismatch) {
        console.log(
          'Persisted config key mismatch (login). Wiping config. Probably because of a new config schema version'
        )
        return localforage.removeItem('login')
      }

      // Persist config
      setIsVisible(config.isVisible)
      setIterations(config.iterations)
      setAreIdsUnique(config.areIdsUnique)
      setIsForm(config.isForm)
    })
  }, [])

  function persistSettings(changes: Object) {
    localforage.setItem('login', {
      isVisible,
      iterations,
      areIdsUnique,
      isForm,
      ...changes,
    })
  }
  function toggleVisibility() {
    let newVal = !isVisible
    setIsVisible(newVal)
    persistSettings({isVisible: newVal})

    dispatch(setConfig({
      section: 'login',
      config: {
        isVisible: newVal,
      },
    }))
  }
  function increaseIterations() {
    let newVal = iterations + 1
    setIterations(newVal)
    persistSettings({iterations: newVal})

    dispatch(setConfig({
      section: 'login',
      config: {
        iterations: newVal,
      },
    }))
  }
  function decreaseIterations() {
    if (iterations > 1) {
      let newVal = iterations - 1
      setIterations(newVal)
      persistSettings({iterations: newVal})

      dispatch(setConfig({
        section: 'login',
        config: {
          iterations: newVal,
        },
      }))
    }
  }
  function toggleUniqueIds() {
    let newVal = !areIdsUnique
    setAreIdsUnique(newVal)
    persistSettings({areIdsUnique: newVal})

    dispatch(setConfig({
      section: 'login',
      config: {
        areIdsUnique: newVal,
      },
    }))
  }
  function toggleIsForm() {
    let newVal = !isForm
    setIsForm(newVal)
    persistSettings({isForm: newVal})

    dispatch(setConfig({
      section: 'login',
      config: {
        isForm: newVal,
      },
    }))
  }

  function renderIterations() {
    const iNodes = []
    for (let i = 0; i < iterations; i++) {
      iNodes.push(
        <LoginFields key={i} iteration={i + 1} areIdsUnique={areIdsUnique} isForm={isForm} />
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
          &nbsp; Login Fields &nbsp;
          <Tooltip title="Fake login fields available for Keeper's extension to target.">
            <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
          </Tooltip>
        </div>

        {isVisible && (
          <SpecificSettings>
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
              isForm={isForm}
              toggleIsForm={toggleIsForm}
              toggleUniqueIds={toggleUniqueIds}
            />
          </SpecificSettings>
        )}
      </Header>

      {isVisible && renderIterations()}
    </Wrap>
  )
}


function mapStateToProps(state: TStore) {
  return {
    config: state.customization.login,
  }
}

export default connect(mapStateToProps)(LoginSection)
