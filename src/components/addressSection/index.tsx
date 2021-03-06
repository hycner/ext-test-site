import React from 'react'
import {connect} from 'react-redux'

import {SingleSectionDisplay} from '../../modules/app/redux/bootstrap'
import {StoreSettingsAddress} from '../../modules/settings/redux'
import {Store} from '../../modules/rootReducer'
import {ConfigMenuItems} from '../_configMenu'

import Fields from './fields'
import Section from '../_section'

type Props = {
  settings: StoreSettingsAddress
  singleSectionDisplay: SingleSectionDisplay
}

const AddressSection: React.FC<Props> = props => {
  const configMenuItems: ConfigMenuItems = [
    // [
    // {
    //   key: 'isIframeField',
    //   label: 'Wrap each field in <iframe>',
    //   value: props.settings.isIframeField,
    // },
    // ],

    [
      {
        key: 'hasEmail',
        label: 'Add email field',
        value: props.settings.hasEmail,
      },
      {
        key: 'hasName',
        label: 'Add name field',
        value: props.settings.hasName,
      },
      {
        key: 'hasPhone',
        label: 'Add phone field',
        value: props.settings.hasPhone,
      },
    ],
  ]

  let iterationHeight = 250

  if (props.settings.hasEmail) iterationHeight += 37
  if (props.settings.hasPhone) iterationHeight += 37

  if (props.settings.isLabelled) {
    iterationHeight += 21 * 5
    if (props.settings.hasEmail) iterationHeight += 21
    if (props.settings.hasPhone) iterationHeight += 21
  }

  if (props.settings.isInputNested && props.settings.isInputNestedWithRandomText) {
    iterationHeight += 21 * 5
    if (props.settings.hasEmail) iterationHeight += 21
    if (props.settings.hasPhone) iterationHeight += 21
  }

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
