import React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsLogin} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  const configMenuItems = [
    {
      key: 'areIdsUnique',
      label: 'Disable Unique IDs',
      value: !props.settings.areIdsUnique,
    },
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
      key: 'isThreeField',
      label: 'Three fields',
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

export default connect(mapStateToProps)(React.memo(LoginSection))
