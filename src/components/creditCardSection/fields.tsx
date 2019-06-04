import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input, Select, Switch} from 'antd'
import {Store} from '../../modules/rootReducer'
import {connect} from 'react-redux'

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
        <Input
          id={`cardholderName${iteration}`}
          placeholder="Name on Card"
          style={FIELD_STYLE}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          id={`cardNumber${iteration}`}
          placeholder="Card Number"
          style={FIELD_STYLE}
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
        />

        <div style={{display: 'flex'}}>
          <Input
            id={`cvv${iteration}`}
            placeholder="CVV"
            style={FIELD_STYLE}
            value={cvv}
            onChange={e => setCvv(e.target.value)}
          />

          {!isAlternateDateFormat && (
            <Input
              id={`expiration-date${iteration}`}
              placeholder="Expiration Date"
              style={FIELD_STYLE}
              value={expDateFull}
              onChange={e => setExpDateFull(e.target.value)}
            />
          )}

          {isAlternateDateFormat && (
            <>
              <Select
                id={`expiration-month${iteration}`}
                style={{...FIELD_STYLE, flex: '120px 0 0'}}
                value={expMonth}
                onChange={(val: string) => setExpMonth(val)}
              >
                {MONTHS.map(x => (
                  <Select.Option key={x.value} value={x.value}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>

              <Select
                id={`expiration-year${iteration}`}
                style={{...FIELD_STYLE, flex: '80px 0 0'}}
                value={expYear}
                onChange={(val: string) => setExpYear(val)}
              >
                {YEARS.map(x => (
                  <Select.Option key={x.value} value={x.value}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>
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
    isMultiButton: cSettings.isMultiButton,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'creditCard' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(Fields)

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
