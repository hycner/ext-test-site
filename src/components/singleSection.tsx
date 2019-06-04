import React from 'react'
import {Store} from '../modules/rootReducer';
import {connect} from 'react-redux';
import {StoreSettingsAddress, StoreSettingsCreditCard, StoreSettingsLogin} from '../modules/settings/redux';

type Props = {
  section: boolean | 'address' | 'creditCard' | 'login'
  settings: StoreSettingsAddress | StoreSettingsCreditCard | StoreSettingsLogin | {}
}

const SingleSection: React.FC<Props> = (props) => {
  if (typeof props.section === 'boolean') {
    return null
  }

  let Section = require(`./${props.section}Section/fields`).default

  return (
    <Section />
  )
}

function mapStateToProps(state: Store) {
  const settingsSection = typeof state.app.bootstrap.singleSectionDisplay === 'boolean'
    ? ''
    : state.app.bootstrap.singleSectionDisplay

  return {
    section: state.app.bootstrap.singleSectionDisplay,
    settings: state.settings[settingsSection] || {},
  }
}

export default connect(mapStateToProps)(SingleSection)