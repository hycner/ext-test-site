import React from 'react'
import {connect} from 'react-redux'

import {setSettings} from '../../modules/settings/redux'
import {dispatch} from '../../store'
import {Store} from '../../modules/rootReducer'
import {StoreSettingsLogin} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'

import Section from '../_section'
import Fields from './fields'

type Props = {
  settings: StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  function toggleField(
    field:
      | 'areIdsUnique'
      | 'isForm'
      | 'isIframeSection'
      | 'isMultiButton'
      | 'isThreeField'
      | 'isVisible'
  ) {
    dispatch(
      setSettings({
        section: 'login',
        settings: {
          [field]: !props.settings[field],
        },
      })
    )
  }

  const configMenuItems = [
    {
      key: 'unique',
      label: 'Disable Unique IDs',
      onChange: () => toggleField('areIdsUnique'),
      value: !props.settings.areIdsUnique,
    },
    {
      key: 'form',
      label: 'Wrap each section in <form>',
      onChange: () => toggleField('isForm'),
      value: props.settings.isForm,
    },
    {
      key: 'iframeSection',
      label: 'Wrap each section in <iframe>',
      onChange: () => toggleField('isIframeSection'),
      value: props.settings.isIframeSection,
    },
    {
      key: 'buttons',
      label: 'Multiple Buttons',
      onChange: () => toggleField('isMultiButton'),
      value: props.settings.isMultiButton,
    },
    {
      key: 'three',
      label: 'Three fields',
      onChange: () => toggleField('isThreeField'),
      value: props.settings.isThreeField,
    },
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

export default connect(mapStateToProps)(LoginSection)
