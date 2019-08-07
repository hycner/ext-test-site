import React from 'react'
import {useIntl} from 'react-intl'

import {StoreSettingsCreditCard} from '../../../modules/settings/redux'
import GenericField from '../../_genericField'

type ExpirationValues = Array<{
  label: string
  value: string
}>
const MONTHS: ExpirationValues = [
  {value: '01', label: 'January'},
  {value: '02', label: 'February'},
  {value: '03', label: 'March'},
  {value: '04', label: 'April'},
  {value: '05', label: 'May'},
  {value: '06', label: 'June'},
  {value: '07', label: 'July'},
  {value: '08', label: 'August'},
  {value: '09', label: 'September'},
  {value: '10', label: 'October'},
  {value: '11', label: 'November'},
  {value: '12', label: 'December'},
]
const YEARS: ExpirationValues = []
const currentYear = new Date().getFullYear()
for (let i = currentYear; i < currentYear + 10; i++) {
  YEARS.push({value: String(i).slice(2), label: String(i)})
}

const FIELD_STYLE = {
  marginLeft: 2,
  marginRight: 2,
  marginBottom: 5,
}

type Props = {
  dateFormat: string
  expDateFull: string
  expMonth: string
  expYear: string
  iteration: string | number
  setExpDateFull: (date: string) => void
  setExpMonth: (month: string) => void
  setExpYear: (year: string) => void
  settings: StoreSettingsCreditCard
}

const Expiration: React.FC<Props> = props => {
  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  if (props.dateFormat === 'string') {
    return (
      <GenericField
        iteration={props.iteration}
        labelKey="expDate"
        messages={messages}
        settings={props.settings}
        value={props.expDateFull}
        valueSetter={props.setExpDateFull}
      />
    )
  }

  if (props.dateFormat === 'select') {
    return (
      <>
        <div style={{...FIELD_STYLE, flex: '120px 0 0'}}>
          <GenericField
            iteration={props.iteration}
            labelKey="expMonth"
            messages={messages}
            selectOptions={MONTHS}
            settings={props.settings}
            value={props.expMonth}
            valueSetter={props.setExpMonth}
          />
        </div>

        <div style={{...FIELD_STYLE, flex: '80px 0 0'}}>
          <GenericField
            iteration={props.iteration}
            labelKey="expYear"
            messages={messages}
            selectOptions={YEARS}
            settings={props.settings}
            value={props.expYear}
            valueSetter={props.setExpYear}
          />
        </div>
      </>
    )
  }

  if (props.dateFormat === 'non-standard') {
    return (
      <>
        <div style={{...FIELD_STYLE, flex: '120px 0 0'}}>
          <GenericField
            isSelectAntd={true}
            iteration={props.iteration}
            labelKey="expMonth"
            messages={messages}
            selectOptions={MONTHS}
            settings={props.settings}
            value={props.expMonth}
            valueSetter={props.setExpMonth}
          />
        </div>

        <div style={{...FIELD_STYLE, flex: '80px 0 0'}}>
          <GenericField
            isSelectAntd={true}
            iteration={props.iteration}
            labelKey="expYear"
            messages={messages}
            selectOptions={YEARS}
            settings={props.settings}
            value={props.expYear}
            valueSetter={props.setExpYear}
          />
        </div>
      </>
    )
  }

  return null
}

export default React.memo(Expiration)
