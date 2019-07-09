import React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsCreditCard} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {ConfigMenuItems} from '../_configMenu'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsCreditCard
  singleSectionDisplay: SingleSectionDisplay
}

const CreditCardSection: React.FC<Props> = props => {
  const configMenuItems: ConfigMenuItems = []

  let iterationHeight = 228

  return (
    <Section
      configMenuItems={configMenuItems}
      description="Fake credit card fields for extensions to target"
      fieldsComponent={Fields}
      iterationHeight={iterationHeight}
      label="Credit Card Fields"
      section="creditCard"
      settings={props.settings}
      singleSectionDisplay={props.singleSectionDisplay}
    />
  )
}

function mapStateToProps(state: Store) {
  return {
    settings: state.settings.creditCard,
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(React.memo(CreditCardSection))
