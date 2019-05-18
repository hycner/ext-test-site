import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'
import localforage from 'localforage'

import Fields from './fields'
import ConfigMenu from './configMenu'
import {setConfig} from '../../modules/customization/redux';
import {dispatch} from '../../store';
import {TStore} from '../../modules/rootReducer';
import {TStoreCustomizationCreditCard} from '../../modules/customization/redux';
import {connect} from 'react-redux';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
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

type CCConfig = {
  isVisible: boolean
  iterations: number
  areIdsUnique: boolean
  isForm: boolean
}

const STATE_KEYS = ['isVisible', 'iterations', 'areIdsUnique', 'isForm']

type TProps = {
  config: TStoreCustomizationCreditCard
}

function CreditCardSection(props: TProps) {
  useEffect(() => {
    // @ts-ignore
    localforage.getItem('creditCard').then((config: CCConfig) => {
      if (!config) return

      // Wipe config if mismatched
      const cfgKeys = Object.keys(config)
      if (cfgKeys.length !== STATE_KEYS.length) {
        return localforage.removeItem('creditCard')
      }
      const isCfgMismatch = !cfgKeys.every(key => STATE_KEYS.includes(key))
      if (isCfgMismatch) {
        console.log(
          'Persisted config key mismatch (login). Wiping config. Probably because of a new config schema version'
        )
        return localforage.removeItem('creditCard')
      }

      // Load config
      dispatch(setConfig({
        section: 'creditCard',
        config,
      }))
    })
  }, [])

  function persistSettings(changes: Object) {
    localforage.setItem('creditCard', {
      isVisible: props.config.isVisible,
      iterations: props.config.iterations,
      areIdsUnique: props.config.areIdsUnique,
      isForm: props.config.isForm,
      ...changes,
    })
  }
  function toggleVisibility() {
    let newVal = !props.config.isVisible
    persistSettings({isVisible: newVal})

    dispatch(setConfig({
      section: 'creditCard',
      config: {
        isVisible: newVal,
      },
    }))
  }
  function increaseIterations() {
    let newVal = props.config.iterations + 1
    persistSettings({iterations: newVal})

    dispatch(setConfig({
      section: 'creditCard',
      config: {
        iterations: newVal,
      },
    }))
  }
  function decreaseIterations() {
    if (props.config.iterations > 1) {
      let newVal = props.config.iterations - 1
      persistSettings({iterations: newVal})

      dispatch(setConfig({
        section: 'creditCard',
        config: {
          iterations: newVal,
        },
      }))
    }
  }
  function toggleUniqueIds() {
    let newVal = !props.config.areIdsUnique
    persistSettings({areIdsUnique: newVal})

    dispatch(setConfig({
      section: 'creditCard',
      config: {
        areIdsUnique: newVal,
      },
    }))
  }
  function toggleIsForm() {
    let newVal = !props.config.isForm
    persistSettings({isForm: newVal})

    dispatch(setConfig({
      section: 'creditCard',
      config: {
        isForm: newVal,
      },
    }))
  }

  function renderIterations() {
    const iNodes = []
    for (let i = 0; i < props.config.iterations; i++) {
      iNodes.push(<Fields key={i} iteration={i + 1} areIdsUnique={props.config.areIdsUnique} isForm={props.config.isForm} />)
    }
    return iNodes
  }

  return (
    <Wrap>
      <Header>
        <div>
          <Icon
            type={props.config.isVisible ? 'eye' : 'eye-invisible'}
            theme="filled"
            style={ICON_STYLE}
            onClick={toggleVisibility}
          />
          &nbsp; Credit Card Fields &nbsp;
          <Tooltip title="Fake credit card fields available for Keeper's extension to target.">
            <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
          </Tooltip>
        </div>

        {props.config.isVisible && (
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
              areIdsUnique={props.config.areIdsUnique}
              isForm={props.config.isForm}
              toggleIsForm={toggleIsForm}
              toggleUniqueIds={toggleUniqueIds}
            />
          </SpecificSettings>
        )}
      </Header>

      {props.config.isVisible && renderIterations()}
    </Wrap>
  )
}

function mapStateToProps(state: TStore) {
  return {
    config: state.customization.creditCard,
  }
}

export default connect(mapStateToProps)(CreditCardSection)
