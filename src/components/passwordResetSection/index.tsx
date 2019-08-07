import React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsPasswordReset} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {ConfigMenuItems} from '../_configMenu'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsPasswordReset
  singleSectionDisplay: SingleSectionDisplay
}

const PasswordResetSection: React.FC<Props> = props => {
  const configMenuItems: ConfigMenuItems = [
    [
      {
        key: 'hasConfirmOld',
        label: "Remove current password field",
        value: !props.settings.hasConfirmOld,
      },
      {
        key: 'hasConfirmNew',
        label: "Remove confirm new password field",
        value: !props.settings.hasConfirmNew,
      },
      {
        key: 'hasEmail',
        label: 'Add email field',
        value: props.settings.hasEmail,
      },
    ],
  ]

  let iterationHeight = 100

  if (props.settings.hasConfirmNew) iterationHeight += 37
  if (props.settings.hasConfirmOld) iterationHeight += 37
  if (props.settings.hasEmail) iterationHeight += 37

  if (props.settings.isLabelled) {
    iterationHeight += 21
    if (props.settings.hasConfirmNew) iterationHeight += 21
    if (props.settings.hasConfirmOld) iterationHeight += 21
    if (props.settings.hasEmail) iterationHeight += 21
  }

  if (props.settings.isInputNested && props.settings.isInputNestedWithRandomText) {
    iterationHeight += 21
    if (props.settings.hasConfirmNew) iterationHeight += 21
    if (props.settings.hasConfirmOld) iterationHeight += 21
    if (props.settings.hasEmail) iterationHeight += 21
  }

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
