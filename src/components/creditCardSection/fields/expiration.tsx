import React from 'react'
import {Input, Select} from 'antd'

import MaybeLabel from '../../_maybeLabel'

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
  isLabelled: boolean
  isLabelledWithFor: boolean
  iteration: string | number
  setExpDateFull: (date: string) => void
  setExpMonth: (month: string) => void
  setExpYear: (year: string) => void
}

const Expiration: React.FC<Props> = props => {
  if (props.dateFormat === 'string') {
    return (
      <div style={FIELD_STYLE}>
        <MaybeLabel
          isActive={props.isLabelled}
          label="Exp Date"
          {...(props.isLabelledWithFor && {target: `expiration-date${props.iteration}`})}
        />
        <Input
          id={`expiration-date${props.iteration}`}
          placeholder="Expiration Date"
          value={props.expDateFull}
          onChange={e => props.setExpDateFull(e.target.value)}
        />
      </div>
    )
  }

  if (props.dateFormat === 'select') {
    return (
      <>
        <div style={{...FIELD_STYLE, flex: '120px 0 0'}}>
          <MaybeLabel
            isActive={props.isLabelled}
            label="Exp Month"
            {...(props.isLabelledWithFor && {target: `expiration-month${props.iteration}`})}
          />
          <select
            id={`expiration-month${props.iteration}`}
            value={props.expMonth}
            onChange={(e: any) => props.setExpMonth(e.target.value)}
            className="ant-select-selection"
            style={{width: '100%', height: '100%'}}
          >
            {MONTHS.map(x => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{...FIELD_STYLE, flex: '80px 0 0'}}>
          <MaybeLabel
            isActive={props.isLabelled}
            label="Exp Year"
            {...(props.isLabelledWithFor && {target: `expiration-year${props.iteration}`})}
          />
          <select
            id={`expiration-year${props.iteration}`}
            value={props.expYear}
            onChange={(e: any) => props.setExpYear(e.target.value)}
            className="ant-select-selection"
            style={{width: '100%', height: '100%'}}
          >
            {YEARS.map(x => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }

  if (props.dateFormat === 'non-standard') {
    return (
      <>
        <div style={{...FIELD_STYLE, flex: '120px 0 0'}}>
          <MaybeLabel
            isActive={props.isLabelled}
            label="Exp Month"
            {...(props.isLabelledWithFor && {target: `expiration-month${props.iteration}`})}
          />
          <Select
            id={`expiration-month${props.iteration}`}
            value={props.expMonth}
            onChange={(val: string) => props.setExpMonth(val)}
            style={{width: '100%'}}
          >
            {MONTHS.map(x => (
              <Select.Option key={x.value} value={x.value}>
                {x.label}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div style={{...FIELD_STYLE, flex: '80px 0 0'}}>
          <MaybeLabel
            isActive={props.isLabelled}
            label="Exp Year"
            {...(props.isLabelledWithFor && {target: `expiration-year${props.iteration}`})}
          />
          <Select
            id={`expiration-year${props.iteration}`}
            value={props.expYear}
            onChange={(val: string) => props.setExpYear(val)}
            style={{width: '100%'}}
          >
            {YEARS.map(x => (
              <Select.Option key={x.value} value={x.value}>
                {x.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </>
    )
  }

  return null
}

export default React.memo(Expiration)
