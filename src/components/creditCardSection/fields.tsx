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
  isForm: boolean
  isLabelled: boolean
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

  function onSubmit() {
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

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Wrap>
        <MaybeLabel
          isActive={props.isLabelled}
          label="Name on Card"
          target={`cardholderName${iteration}`}
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
          target={`cardNumber${iteration}`}
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
            <MaybeLabel isActive={props.isLabelled} label="CVV" target={`cvv${iteration}`} />
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
                target={`expiration-date${iteration}`}
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
                  target={`expiration-month${iteration}`}
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
                  target={`expiration-year${iteration}`}
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
    </Form>
  )
}

function mapStateToProps(state: Store) {
  const cSettings = state.settings.creditCard

  return {
    areIdsUnique: cSettings.areIdsUnique,
    isForm: cSettings.isForm,
    isLabelled: cSettings.isLabelled,
    isMultiButton: cSettings.isMultiButton,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'creditCard' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(React.memo(Fields))

// Helper functions

type FormProps = {
  children: any
}
function RealForm(props: FormProps) {
  return <form>{props.children}</form>
}
function FakeForm(props: FormProps) {
  return <>{props.children}</>
}
