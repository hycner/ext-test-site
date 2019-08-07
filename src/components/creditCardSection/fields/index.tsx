import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Radio} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../../modules/rootReducer'
import {StoreSettingsCreditCard} from '../../../modules/settings/redux'
import Expiration from './expiration'
import GenericField from '../../_genericField'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`
const FormatWrap = styled.div`
  margin-top: 2px;
`
const ButtonsWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`

const BTN_STYLE = {
  marginLeft: 2,
  marginRight: 2,
}

type Props = {
  iteration: number
  settings: StoreSettingsCreditCard
}

const Index: React.FC<Props> = props => {
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')
  const [expDateFull, setExpDateFull] = useState<string>('')
  const [expMonth, setExpMonth] = useState<string>('')
  const [expYear, setExpYear] = useState<string>('')
  const [dateFormat, setDateFormat] = useState<string>('string')
  const [name, setName] = useState<string>('')

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function changeDateFormat(e: any) {
    setDateFormat(e.target.value)
  }

  function onSubmit(e: any): void {
    e.preventDefault()
    console.log(`Credit card (${props.iteration}) save clicked`)
    console.log({cardNumber, cvv, expDateFull, expMonth, expYear, dateFormat, name})
  }

  function onClear(): void {
    console.log(`Credit card (${props.iteration}) clear clicked`)
    setCardNumber('')
    setCvv('')
    setExpDateFull('')
    setExpMonth('')
    setExpYear('')
    setName('')
  }

  function onNothing(): void {
    console.log(`Credit card (${props.iteration}) nothing clicked`)
  }

  let Form = props.settings.isForm ? RealForm : FakeForm
  let Fieldset = props.settings.isFieldset ? RealFieldset : FakeFieldset

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.settings.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          <GenericField
            iteration={iteration}
            labelKey="name"
            messages={messages}
            settings={props.settings}
            value={name}
            valueSetter={setName}
          />

          <GenericField
            iteration={iteration}
            labelKey="number"
            messages={messages}
            settings={props.settings}
            value={cardNumber}
            valueSetter={setCardNumber}
          />

          <div style={{display: 'flex'}}>
            <GenericField
              iteration={iteration}
              labelKey="cvv"
              messages={messages}
              settings={props.settings}
              value={cvv}
              valueSetter={setCvv}
            />

            <Expiration
              dateFormat={dateFormat}
              expDateFull={expDateFull}
              expMonth={expMonth}
              expYear={expYear}
              iteration={iteration}
              setExpDateFull={setExpDateFull}
              setExpMonth={setExpMonth}
              setExpYear={setExpYear}
              settings={props.settings}
            />
          </div>

          <FormatWrap>
            <div>Expiration Format:</div>
            <Radio.Group onChange={changeDateFormat} value={dateFormat}>
              <Radio value="string">String</Radio>
              <Radio value="select">Select</Radio>
              <Radio value="non-standard">Non-Standard</Radio>
            </Radio.Group>
          </FormatWrap>

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              {messages.save}
            </Button>
            {props.settings.isMultiButton && (
              <>
                <Button style={BTN_STYLE} onClick={onClear} htmlType="reset">
                  {messages.clear}
                </Button>
                <Button style={BTN_STYLE} onClick={onNothing} htmlType="button">
                  {messages.nothing}
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
  const settings = state.settings.creditCard

  return {
    settings,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'creditCard' && {
      iteration: state.app.bootstrap.singleDisplayIteration,
    }),
  }
}

export default connect(mapStateToProps)(React.memo(Index))

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
