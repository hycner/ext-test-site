import React from 'react'
import {connect} from 'react-redux'
import {Select} from 'antd'

import {dispatch} from '../../store'
import {Store} from '../../modules/rootReducer'
import {LocaleOptions, setSettings, StoreSettingsLogin} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  function changeLocale(locale: LocaleOptions): void {
    console.log('** locale', locale)

    dispatch(
      setSettings({
        section: 'login',
        settings: {
          locale,
        },
      })
    )
  }

  const configMenuItems = [
    [
      {
        key: 'isLocaleChanged',
        label: (
          <>
            Change locale to:&nbsp;
            <Select value={props.settings.locale} onChange={changeLocale}>
              <Select.Option value="en-US">en-US</Select.Option>
              <Select.Option value="ja-JP">ja-JP</Select.Option>
            </Select>
          </>
        ),
        value: props.settings.isLocaleChanged,
      },
    ],

    [
      {
        key: 'isForm',
        label: 'Wrap each section in <form>',
        value: props.settings.isForm,
      },
      {
        key: 'isFieldset',
        label: 'Wrap each section in <fieldset>',
        value: props.settings.isFieldset,
      },
      {
        key: 'isIframeSection',
        label: 'Wrap each section in <iframe>',
        value: props.settings.isIframeSection,
      },
    ],

    [
      {
        key: 'areIdsUnique',
        label: 'Disable Unique IDs',
        value: !props.settings.areIdsUnique,
      },
      {
        key: 'isMultiButton',
        label: 'Multiple Buttons',
        value: props.settings.isMultiButton,
      },
      {
        key: 'isLabelled',
        label: 'Each Field has a <label>',
        value: props.settings.isLabelled,
      },
      {
        key: 'isLabelledWithFor',
        label: "Exclude 'for' on <label>",
        masterValid: props.settings.isLabelled,
        value: !props.settings.isLabelledWithFor,
      },
    ],

    [
      {
        key: 'isThreeField',
        label: 'Three fields',
        value: props.settings.isThreeField,
      },
    ],
  ]

  let iterationHeight = 140
  if (props.settings.isThreeField) iterationHeight += 37

  return (
    <Section
      configMenuItems={configMenuItems}
      description="Fake login fields for extensions to target"
      fieldsComponent={Fields}
      iterationHeight={iterationHeight}
      label="Login Fields"
      section="login"
      settings={props.settings}
      singleSectionDisplay={props.singleSectionDisplay}
    />
  )
}

function mapStateToProps(state: Store) {
  return {
    settings: state.settings.login,
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(React.memo(LoginSection))
