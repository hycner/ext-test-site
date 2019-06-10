import React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsCreditCard} from '../../modules/settings/redux'
import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsCreditCard
  singleSectionDisplay: SingleSectionDisplay
}

const CreditCardSection: React.FC<Props> = props => {
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
  ]

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

export default connect(mapStateToProps)(CreditCardSection)
