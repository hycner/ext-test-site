import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import {StoreSettingsAddress} from '../../modules/settings/redux'
import GenericField from '../_genericField'

const Wrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
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
  settings: StoreSettingsAddress
}

const Fields: React.FC<Props> = props => {
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [streetOne, setStreetOne] = useState<string>('')
  const [streetTwo, setStreetTwo] = useState<string>('')
  const [zip, setZip] = useState<string>('')

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function onSubmit(e: any): void {
    e.preventDefault()
    console.log(`Address (${props.iteration}) submit clicked`)
    console.log({
      city,
      country,
      ...(props.settings.hasEmail && {email}),
      name,
      ...(props.settings.hasPhone && {phone}),
      state,
      streetOne,
      streetTwo,
      zip,
    })
  }

  function onClear(): void {
    console.log(`Address (${props.iteration}) clear clicked`)
    setCity('')
    setCountry('')
    setEmail('')
    setName('')
    setPhone('')
    setState('')
    setStreetOne('')
    setStreetTwo('')
    setZip('')
  }

  function onNothing(): void {
    console.log(`Address (${props.iteration}) nothing clicked`)
  }

  let Form = props.settings.isForm ? RealForm : FakeForm
  let Fieldset = props.settings.isFieldset ? RealFieldset : FakeFieldset
  // todo: finish implementing field-level iframe or remove
  // let IframeField = props.settings.isIframeField ? RealIframeField : FakeIframeField

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.settings.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.settings.hasName && (
            <GenericField
              iteration={iteration}
              labelKey="name"
              messages={messages}
              settings={props.settings}
              value={name}
              valueSetter={setName}
            />
          )}

          <div style={{display: 'flex', width: '100%'}}>
            {props.settings.hasEmail && (
              <GenericField
                iteration={iteration}
                labelKey="email"
                messages={messages}
                settings={props.settings}
                value={email}
                valueSetter={setEmail}
              />
            )}

            {props.settings.hasPhone && (
              <GenericField
                iteration={iteration}
                labelKey="phone"
                messages={messages}
                settings={props.settings}
                value={phone}
                valueSetter={setPhone}
              />
            )}
          </div>

          <GenericField
            iteration={iteration}
            labelKey="street1"
            messages={messages}
            settings={props.settings}
            value={streetOne}
            valueSetter={setStreetOne}
          />

          <GenericField
            iteration={iteration}
            labelKey="street2"
            messages={messages}
            settings={props.settings}
            value={streetTwo}
            valueSetter={setStreetTwo}
          />

          <GenericField
            iteration={iteration}
            labelKey="city"
            messages={messages}
            settings={props.settings}
            value={city}
            valueSetter={setCity}
          />

          <div style={{display: 'flex'}}>
            <GenericField
              iteration={iteration}
              labelKey="state"
              messages={messages}
              settings={props.settings}
              value={state}
              valueSetter={setState}
            />

            <GenericField
              iteration={iteration}
              labelKey="zip"
              messages={messages}
              settings={props.settings}
              value={zip}
              valueSetter={setZip}
            />
          </div>

          <GenericField
            iteration={iteration}
            labelKey="country"
            messages={messages}
            settings={props.settings}
            value={country}
            valueSetter={setCountry}
          />

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
  const settings = state.settings.address

  return {
    settings,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...(state.app.bootstrap.singleSectionDisplay === 'address' && {
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
// function RealIframeField(props: ChildProps) {
//   return <iframe>{props.children}</iframe>
// }
// function FakeIframeField(props: ChildProps) {
//   return <>{props.children}</>
// }
