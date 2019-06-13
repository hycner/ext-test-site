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
      key: 'hasConfirmNew',
      label: "Don't Confirm New Password",
      value: !props.settings.hasConfirmNew,
    },
    {
      key: 'hasConfirmOld',
      label: "Don't Verify Current Password",
      value: !props.settings.hasConfirmOld,
    },
    {
      key: 'hasEmail',
      label: 'Email Field',
      value: props.settings.hasEmail,
    },
  ]

  let iterationHeight = 100
  if (props.settings.hasConfirmNew) iterationHeight += 37
  if (props.settings.hasConfirmOld) iterationHeight += 37
  if (props.settings.hasEmail) iterationHeight += 37

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

export default connect(mapStateToProps)(React.memo(PasswordResetSection))