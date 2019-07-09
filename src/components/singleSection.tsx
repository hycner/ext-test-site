import React from 'react'
import {Store} from '../modules/rootReducer'
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl'

import {
  StoreSettingsAddress,
  StoreSettingsCreditCard,
  StoreSettingsLogin,
} from '../modules/settings/redux'
import {SingleSectionDisplay} from '../modules/app/redux/bootstrap'
import intlConfig from '../lib/intl'

type Settings = StoreSettingsAddress | StoreSettingsCreditCard | StoreSettingsLogin
type Props = {
  section: SingleSectionDisplay
  settings: Settings | {}
}

const SingleSection: React.FC<Props> = props => {
  if (!props.section) {
    return null
  }

  let Section = require(`./${props.section}Section/fields`).default

  const settings = props.settings as Settings
  const locale = settings.isLocaleChanged ? settings.locale : 'en-US'

  return (
    <IntlProvider locale={locale} messages={intlConfig[locale][props.section]}>
      <Section />
    </IntlProvider>
  )
}

function mapStateToProps(state: Store) {
  const settingsSection = state.app.bootstrap.singleSectionDisplay

  return {
    section: state.app.bootstrap.singleSectionDisplay,
    settings: state.settings[settingsSection] || {},
  }
}

export default connect(mapStateToProps)(React.memo(SingleSection))
