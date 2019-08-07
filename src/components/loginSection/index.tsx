import React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsLogin} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {ConfigMenuItems} from '../_configMenu'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  const configMenuItems: ConfigMenuItems = [
    [
      {
        key: 'isThreeField',
        label: 'Add account ID field',
        value: props.settings.isThreeField,
      },
      {
        key: 'is2FA',
        label: 'Add 2FA field',
        value: props.settings.is2FA,
      },
    ],
  ]

  let iterationHeight = 140

  if (props.settings.isThreeField) iterationHeight += 37
  if (props.settings.is2FA) iterationHeight += 37

  if (props.settings.isLabelled) {
    iterationHeight += 21 * 2
    if (props.settings.isThreeField) iterationHeight += 21
    if (props.settings.is2FA) iterationHeight += 21
  }

  if (props.settings.isInputNested && props.settings.isInputNestedWithRandomText) {
    iterationHeight += 21 * 2
    if (props.settings.isThreeField) iterationHeight += 21
    if (props.settings.is2FA) iterationHeight += 21
  }

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
