import React from 'react'
import {connect} from 'react-redux'

import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {StoreSettingsAddress} from '../../modules/settings/redux'
import {Store} from '../../modules/rootReducer'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsAddress
  singleSectionDisplay: SingleSectionDisplay
}

const AddressSection: React.FC<Props> = props => {
  const configMenuItems = [
    [
      {
        key: 'isForm',
        label: 'Wrap each section in <form>',
        value: props.settings.isForm,
      },
      {
        key: 'isFieldset',
        label: 'Wrap each section in <fieldset>',
        value: props.settings.isFieldset,
      },
      {
        key: 'isIframeSection',
        label: 'Wrap each section in <iframe>',
        value: props.settings.isIframeSection,
      },
    ],

    [
      {
        key: 'areIdsUnique',
        label: 'Disable Unique IDs',
        value: !props.settings.areIdsUnique,
      },
      // {
      //   key: 'isIframeField',
      //   label: 'Wrap each field in <iframe>',
      //   value: props.settings.isIframeField,
      // },
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
        key: 'isLabelledWithFor',
        label: "Exclude 'for' on <label>",
        masterValid: props.settings.isLabelled,
        value: !props.settings.isLabelledWithFor,
      },
    ],

    [
      {
        key: 'hasEmail',
        label: 'Email Field',
        value: props.settings.hasEmail,
      },
      {
        key: 'hasName',
        label: 'Name Field',
        value: props.settings.hasName,
      },
      {
        key: 'hasPhone',
        label: 'Phone Field',
        value: props.settings.hasPhone,
      },
    ],
  ]

  let iterationHeight = 325
  if (props.settings.hasEmail) iterationHeight += 37
  if (props.settings.hasPhone) iterationHeight += 37

  return (
    <Section
      configMenuItems={configMenuItems}
      description="Fake address fields for extensions to target. If you enable any iframe config settings, then DOM iframe access tests will fail."
      fieldsComponent={Fields}
      iterationHeight={iterationHeight}
      label="Address Fields"
      section="address"
      settings={props.settings}
      singleSectionDisplay={props.singleSectionDisplay}
    />
  )
}

function mapStateToProps(state: Store) {
  return {
    settings: state.settings.address,
    singleSectionDisplay: state.app.bootstrap.singleSectionDisplay,
  }
}

export default connect(mapStateToProps)(React.memo(AddressSection))
