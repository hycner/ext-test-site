import React from 'react'
import {Store} from '../modules/rootReducer';
import {connect} from 'react-redux';

import {StoreSettingsAddress, StoreSettingsCreditCard, StoreSettingsLogin} from '../modules/settings/redux';
import {SingleSectionDisplay} from '../modules/app/redux/bootstrap';

type Props = {
  section: SingleSectionDisplay
  settings: StoreSettingsAddress | StoreSettingsCreditCard | StoreSettingsLogin | {}
}

const SingleSection: React.FC<Props> = (props) => {
  if (!props.section) {
    return null
  }

  let Section = require(`./${props.section}Section/fields`).default

  return (
    <Section />
  )
}

function mapStateToProps(state: Store) {
  const settingsSection = state.app.bootstrap.singleSectionDisplay

  return {
    section: state.app.bootstrap.singleSectionDisplay,
    settings: state.settings[settingsSection] || {},
  }
}

export default connect(mapStateToProps)(SingleSection)