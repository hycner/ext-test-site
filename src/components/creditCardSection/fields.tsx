import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input, Select, Switch} from 'antd'
import {connect} from 'react-redux'

import {Store} from '../../modules/rootReducer'
import MaybeLabel from '../_maybeLabel'

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

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`
const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
`
const ButtonsWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`

const FIELD_STYLE = {
  marginLeft: 2,
  marginRight: 2,
  marginBottom: 5,
}
const BTN_STYLE = {
  marginLeft: 2,
  marginRight: 2,
}

type Props = {
  areIdsUnique: boolean
  isFieldset: boolean
  isForm: boolean
  isLabelled: boolean
  isLabelledWithFor: boolean
  isMultiButton: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')
  const [expDateFull, setExpDateFull] = useState<string>('')
  const [expMonth, setExpMonth] = useState<string>('')
  const [expYear, setExpYear] = useState<string>('')
  const [isAlternateDateFormat, setIsAlternateDateFormat] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  function toggleDateFormat() {
    setIsAlternateDateFormat(!isAlternateDateFormat)
  }

  function onSubmit(e: any) {
    e.preventDefault()
    console.log(`Credit card (${props.iteration}) save clicked`)
    console.log({cardNumber, cvv, expDateFull, expMonth, expYear, isAlternateDateFormat, name})
  }

  function onClear() {
    console.log(`Credit card (${props.iteration}) clear clicked`)
    setCardNumber('')
    setCvv('')
    setExpDateFull('')
    setExpMonth('')
    setExpYear('')
    setName('')
  }

  function onNothing() {
    console.log(`Credit card (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm
  let Fieldset = props.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          <MaybeLabel
            isActive={props.isLabelled}
            label="Name on Card"
            {...(props.isLabelledWithFor && {target: `cardholderName${iteration}`})}
          />
          <Input
            id={`cardholderName${iteration}`}
            placeholder="Name on Card"
            style={FIELD_STYLE}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <MaybeLabel
            isActive={props.isLabelled}
            label="Card Number"
            {...(props.isLabelledWithFor && {target: `cardNumber${iteration}`})}
          />
          <Input
            id={`cardNumber${iteration}`}
            placeholder="Card Number"
            style={FIELD_STYLE}
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
          />

          <div style={{display: 'flex'}}>
            <div style={FIELD_STYLE}>
              <MaybeLabel
                isActive={props.isLabelled}
                label="CVV"
                {...(props.isLabelledWithFor && {target: `cvv${iteration}`})}
              />
              <Input
                id={`cvv${iteration}`}
                placeholder="CVV"
                value={cvv}
                onChange={e => setCvv(e.target.value)}
              />
            </div>

            {!isAlternateDateFormat && (
              <div style={FIELD_STYLE}>
                <MaybeLabel
                  isActive={props.isLabelled}
                  label="Exp Date"
                  {...(props.isLabelledWithFor && {target: `expiration-date${iteration}`})}
                />
                <Input
                  id={`expiration-date${iteration}`}
                  placeholder="Expiration Date"
                  value={expDateFull}
                  onChange={e => setExpDateFull(e.target.value)}
                />
              </div>
            )}

            {isAlternateDateFormat && (
              <>
                <div style={{...FIELD_STYLE, flex: '120px 0 0'}}>
                  <MaybeLabel
                    isActive={props.isLabelled}
                    label="Exp Month"
                    {...(props.isLabelledWithFor && {target: `expiration-month${iteration}`})}
                  />
                  <Select
                    id={`expiration-month${iteration}`}
                    value={expMonth}
                    onChange={(val: string) => setExpMonth(val)}
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
                    {...(props.isLabelledWithFor && {target: `expiration-year${iteration}`})}
                  />
                  <Select
                    id={`expiration-year${iteration}`}
                    value={expYear}
                    onChange={(val: string) => setExpYear(val)}
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
            )}
          </div>

          <SwitchWrap>
            <Switch checked={isAlternateDateFormat} onChange={toggleDateFormat} />
            &nbsp; Alternate Expiration Format
          </SwitchWrap>

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              Save Credit Card
            </Button>
            {props.isMultiButton && (
              <>
                <Button style={BTN_STYLE} onClick={onClear} htmlType="reset">
                  Clear
                </Button>
                <Button style={BTN_STYLE} onClick={onNothing} htmlType="button">
                  Nothing
                </Button>
              </>
            )}
          </ButtonsWrap>
        </Wrap>
      </Fieldset>
    </Form>
  )
}

function mapStateToProps(state: Store) {
  const cSettings = state.settings.creditCard

  return {
    areIdsUnique: cSettings.areIdsUnique,
    isFieldset: cSettings.isFieldset,
    isForm: cSettings.isForm,
    isLabelled: cSettings.isLabelled,
    isLabelledWithFor: cSettings.isLabelledWithFor,
    isMultiButton: cSettings.isMultiButton,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'creditCard' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(React.memo(Fields))

// Helper functions

type ChildProps = {
  children: any
}
function RealForm(props: ChildProps) {
  return <form>{props.children}</form>
}
function FakeForm(props: ChildProps) {
  return <>{props.children}</>
}
function RealFieldset(props: ChildProps) {
  return <fieldset>{props.children}</fieldset>
}
function FakeFieldset(props: ChildProps) {
  return <>{props.children}</>
}
