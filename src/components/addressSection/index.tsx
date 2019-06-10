import React from 'react'
import {connect} from 'react-redux'

import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {setSettings, StoreSettingsAddress} from '../../modules/settings/redux'
import {dispatch} from '../../store'
import {Store} from '../../modules/rootReducer'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsAddress
  singleSectionDisplay: SingleSectionDisplay
}

const AddressSection: React.FC<Props> = props => {
  function toggleField(
    field:
      | 'areIdsUnique'
      | 'hasEmail'
      | 'hasName'
      | 'hasPhone'
      | 'isForm'
      | 'isIframeField'
      | 'isIframeSection'
      | 'isMultiButton'
      | 'isVisible'
  ) {
    dispatch(
      setSettings({
        section: 'address',
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
    // {
    //   key: 'iframeField',
    //   label: 'Wrap each field in <iframe>',
    //   onChange: () => toggleField('isIframeField'),
    //   value: props.settings.isIframeField,
    // },
    {
      key: 'buttons',
      label: 'Multiple Buttons',
      onChange: () => toggleField('isMultiButton'),
      value: props.settings.isMultiButton,
    },
    {
      key: 'email',
      label: 'Email Field',
      onChange: () => toggleField('hasEmail'),
      value: props.settings.hasEmail,
    },
    {
      key: 'name',
      label: 'Name Field',
      onChange: () => toggleField('hasName'),
      value: props.settings.hasName,
    },
    {
      key: 'phone',
      label: 'Phone Field',
      onChange: () => toggleField('hasPhone'),
      value: props.settings.hasPhone,
    },
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

export default connect(mapStateToProps)(AddressSection)
