import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {connect} from 'react-redux';

import {Store} from '../../modules/rootReducer';

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

const FIELD_STYLE = {
  marginBottom: 5,
}
const BTN_STYLE = {
  marginLeft: 2,
  marginRight: 2,
}

// todo: pass in the entire settings object instead
type Props = {
  areIdsUnique: boolean
  hasEmail: boolean
  hasPhone: boolean
  isForm: boolean
  isIframeField: boolean
  isIframeSection: boolean
  isMultiButton: boolean
  iteration: number
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

  function onSubmit() {
    console.log(`Address (${props.iteration}) submit clicked`)
    console.log({
      city,
      country,
      ...(props.hasEmail && {email}),
      name,
      ...(props.hasPhone && {phone}),
      state,
      streetOne,
      streetTwo,
      zip,
    })
  }

  function onClear() {
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

  function onNothing() {
    console.log(`Address (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm
  let IframeField = props.isIframeField ? RealIframeField : FakeIframeField

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Wrap>
        <Input
          style={FIELD_STYLE}
          id={`name${iteration}`}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {props.hasEmail && (
          <Input
            style={FIELD_STYLE}
            id={`email${iteration}`}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        )}
        {props.hasPhone && (
          <Input
            style={FIELD_STYLE}
            id={`phone${iteration}`}
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        )}
        <Input
          style={FIELD_STYLE}
          id={`streetOne${iteration}`}
          placeholder="Street 1"
          value={streetOne}
          onChange={e => setStreetOne(e.target.value)}
        />
        <Input
          style={FIELD_STYLE}
          id={`streetTwo${iteration}`}
          placeholder="Street 2"
          value={streetTwo}
          onChange={e => setStreetTwo(e.target.value)}
        />
        <Input
          style={FIELD_STYLE}
          id={`city${iteration}`}
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <Input
          style={FIELD_STYLE}
          id={`state${iteration}`}
          placeholder="State"
          value={state}
          onChange={e => setState(e.target.value)}
        />
        <Input
          style={FIELD_STYLE}
          id={`zip${iteration}`}
          placeholder="Zip"
          value={zip}
          onChange={e => setZip(e.target.value)}
        />
        <Input
          style={FIELD_STYLE}
          id={`country${iteration}`}
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <ButtonsWrap>
          <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
            Save
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
  const aSettings = state.settings.address

  return {
    areIdsUnique: aSettings.areIdsUnique,
    hasEmail: aSettings.hasEmail,
    hasPhone: aSettings.hasPhone,
    isForm: aSettings.isForm,
    isIframeField: aSettings.isIframeField,
    isIframeSection: aSettings.isIframeSection,
    isMultiButton: aSettings.isMultiButton,
    // iteration is passed in from Redux if in a single section display, otherwise it is passed in via regular props
    ...state.app.bootstrap.singleSectionDisplay === 'address' && {iteration: state.app.bootstrap.singleDisplayIteration}
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
function RealIframeField(props: FormProps) {
  return <iframe>{props.children}</iframe>
}
function FakeIframeField(props: FormProps) {
  return <>{props.children}</>
}