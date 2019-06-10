import React from 'react'
import {connect} from 'react-redux'

import {setSettings} from '../../modules/settings/redux'
import {dispatch} from '../../store'
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
  function toggleField(
    field: 'areIdsUnique' | 'isForm' | 'isIframeSection' | 'isMultiButton' | 'isVisible'
  ) {
    dispatch(
      setSettings({
        section: 'creditCard',
        settings: {
          [field]: !props.settings[field],
        },
      })
    )
  }

  const configMenuItems = [
    {
      key: 'unique',
      label: 'Disable Unique IDs',
      onChange: () => toggleField('areIdsUnique'),
      value: !props.settings.areIdsUnique,
    },
    {
      key: 'form',
      label: 'Wrap each section in <form>',
      onChange: () => toggleField('isForm'),
      value: props.settings.isForm,
    },
    {
      key: 'iframeSection',
      label: 'Wrap each section in <iframe>',
      onChange: () => toggleField('isIframeSection'),
      value: props.settings.isIframeSection,
    },
    {
      key: 'buttons',
      label: 'Multiple Buttons',
      onChange: () => toggleField('isMultiButton'),
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
