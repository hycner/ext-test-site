import React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsPasswordReset} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsPasswordReset
  singleSectionDisplay: SingleSectionDisplay
}

const PasswordResetSection: React.FC<Props> = props => {
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
      key: 'isConfirmNew',
      label: "Don't Confirm New Password",
      value: !props.settings.isConfirmNew,
    },
    {
      key: 'isConfirmOld',
      label: "Don't Verify Current Password",
      value: !props.settings.isConfirmOld,
    },
  ]

  let iterationHeight = 100
  if (props.settings.isConfirmNew) iterationHeight += 37
  if (props.settings.isConfirmOld) iterationHeight += 37

  return (
    <Section
      configMenuItems={configMenuItems}
      description="Fake password reset fields for extensions to target"
      fieldsComponent={Fields}
      iterationHeight={iterationHeight}
      label="Password Reset Fields"
      section="passwordReset"
      settings={props.settings}
      singleSectionDisplay={props.singleSectionDisplay}
    />
  )
}

function mapStateToProps(state: Store) {
  return {
    settings: state.settings.passwordReset,
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(PasswordResetSection)
