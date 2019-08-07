import React from 'react'
import {useIntl} from 'react-intl'

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
  areAttrIdentifying: boolean
  dateFormat: string
  expDateFull: string
  expMonth: string
  expYear: string
  isAdjacentInput: boolean
  isInputNested: boolean
  isInputNestedWithDeepInput: boolean
  isDeeperInput: boolean
  isInputNestedWithRandomText: boolean
  isInputNestedWithShallowInput: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isWrappedInDiv: boolean
  iteration: string | number
  setExpDateFull: (date: string) => void
  setExpMonth: (month: string) => void
  setExpYear: (year: string) => void
}

const Expiration: React.FC<Props> = props => {
  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  if (props.dateFormat === 'string') {
    return (
      <GenericField
        areAttrIdentifying={props.areAttrIdentifying}
        isAdjacentInput={props.isAdjacentInput}
        isDeeperInput={props.isDeeperInput}
        isInputNested={props.isInputNested}
        isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
        isInputNestedWithRandomText={props.isInputNestedWithRandomText}
        isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
        isLabelled={props.isLabelled}
        isLabelledOnlyText={props.isLabelledOnlyText}
        isLabelledWithFor={props.isLabelledWithFor}
        isWrappedInDiv={props.isWrappedInDiv}
        iteration={props.iteration}
        labelKey="expDate"
        messages={messages}
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
            areAttrIdentifying={props.areAttrIdentifying}
            isAdjacentInput={props.isAdjacentInput}
            isDeeperInput={props.isDeeperInput}
            isInputNested={props.isInputNested}
            isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
            isInputNestedWithRandomText={props.isInputNestedWithRandomText}
            isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
            isLabelled={props.isLabelled}
            isLabelledOnlyText={props.isLabelledOnlyText}
            isLabelledWithFor={props.isLabelledWithFor}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={props.iteration}
            labelKey="expMonth"
            messages={messages}
            selectOptions={MONTHS}
            value={props.expMonth}
            valueSetter={props.setExpMonth}
          />
        </div>

        <div style={{...FIELD_STYLE, flex: '80px 0 0'}}>
          <GenericField
            areAttrIdentifying={props.areAttrIdentifying}
            isAdjacentInput={props.isAdjacentInput}
            isDeeperInput={props.isDeeperInput}
            isInputNested={props.isInputNested}
            isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
            isInputNestedWithRandomText={props.isInputNestedWithRandomText}
            isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
            isLabelled={props.isLabelled}
            isLabelledOnlyText={props.isLabelledOnlyText}
            isLabelledWithFor={props.isLabelledWithFor}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={props.iteration}
            labelKey="expYear"
            messages={messages}
            selectOptions={YEARS}
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
            areAttrIdentifying={props.areAttrIdentifying}
            isAdjacentInput={props.isAdjacentInput}
            isDeeperInput={props.isDeeperInput}
            isInputNested={props.isInputNested}
            isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
            isInputNestedWithRandomText={props.isInputNestedWithRandomText}
            isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
            isLabelled={props.isLabelled}
            isLabelledOnlyText={props.isLabelledOnlyText}
            isLabelledWithFor={props.isLabelledWithFor}
            isSelectAntd={true}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={props.iteration}
            labelKey="expMonth"
            messages={messages}
            selectOptions={MONTHS}
            value={props.expMonth}
            valueSetter={props.setExpMonth}
          />
        </div>

        <div style={{...FIELD_STYLE, flex: '80px 0 0'}}>
          <GenericField
            areAttrIdentifying={props.areAttrIdentifying}
            isAdjacentInput={props.isAdjacentInput}
            isDeeperInput={props.isDeeperInput}
            isInputNested={props.isInputNested}
            isInputNestedWithDeepInput={props.isInputNestedWithDeepInput}
            isInputNestedWithRandomText={props.isInputNestedWithRandomText}
            isInputNestedWithShallowInput={props.isInputNestedWithShallowInput}
            isLabelled={props.isLabelled}
            isLabelledOnlyText={props.isLabelledOnlyText}
            isLabelledWithFor={props.isLabelledWithFor}
            isSelectAntd={true}
            isWrappedInDiv={props.isWrappedInDiv}
            iteration={props.iteration}
            labelKey="expYear"
            messages={messages}
            selectOptions={YEARS}
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
