import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'
import {connect} from 'react-redux'
import {useIntl} from 'react-intl'

import {Store} from '../../modules/rootReducer'
import MaybeLabel from '../_maybeLabel'

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
  hasEmail: boolean
  hasName: boolean
  hasPhone: boolean
  isFieldset: boolean
  isForm: boolean
  isLabelled: boolean
  isLabelledWithFor: boolean
  isIframeField: boolean
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

  const intl = useIntl()
  const messages = intl.messages as {[key: string]: string}

  function onSubmit(e: any): void {
    e.preventDefault()
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

  let Form = props.isForm ? RealForm : FakeForm
  let Fieldset = props.isFieldset ? RealFieldset : FakeFieldset
  let IframeField = props.isIframeField ? RealIframeField : FakeIframeField

  let iteration = props.iteration > 1 ? props.iteration : ''
  if (!props.areIdsUnique) iteration = ''

  return (
    <Form>
      <Fieldset>
        <Wrap>
          {props.hasName && (
            <>
              <MaybeLabel
                isActive={props.isLabelled}
                label={messages.name}
                {...(props.isLabelledWithFor && {target: `name${iteration}`})}
              />
              <Input
                style={FIELD_STYLE}
                id={`name${iteration}`}
                placeholder={messages.name}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </>
          )}

          <div style={{display: 'flex', width: '100%'}}>
            {props.hasEmail && (
              <div style={FIELD_STYLE}>
                <MaybeLabel
                  isActive={props.isLabelled}
                  label={messages.email}
                  {...(props.isLabelledWithFor && {target: `email${iteration}`})}
                />
                <Input
                  id={`email${iteration}`}
                  placeholder={messages.email}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            )}

            {props.hasPhone && (
              <div style={FIELD_STYLE}>
                <MaybeLabel
                  isActive={props.isLabelled}
                  label={messages.phone}
                  {...(props.isLabelledWithFor && {target: `phone${iteration}`})}
                />
                <Input
                  id={`phone${iteration}`}
                  placeholder={messages.phone}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            )}
          </div>

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.street1}
            {...(props.isLabelledWithFor && {target: `streetOne${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`streetOne${iteration}`}
            placeholder={messages.street1}
            value={streetOne}
            onChange={e => setStreetOne(e.target.value)}
          />

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.street2}
            {...(props.isLabelledWithFor && {target: `streetTwo${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`streetTwo${iteration}`}
            placeholder={messages.street2}
            value={streetTwo}
            onChange={e => setStreetTwo(e.target.value)}
          />

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.city}
            {...(props.isLabelledWithFor && {target: `city${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`city${iteration}`}
            placeholder={messages.city}
            value={city}
            onChange={e => setCity(e.target.value)}
          />

          <div style={{display: 'flex'}}>
            <div style={FIELD_STYLE}>
              <MaybeLabel
                isActive={props.isLabelled}
                label={messages.state}
                {...(props.isLabelledWithFor && {target: `state${iteration}`})}
              />
              <Input
                id={`state${iteration}`}
                placeholder={messages.state}
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>

            <div style={FIELD_STYLE}>
              <MaybeLabel
                isActive={props.isLabelled}
                label={messages.zip}
                {...(props.isLabelledWithFor && {target: `zip${iteration}`})}
              />
              <Input
                id={`zip${iteration}`}
                placeholder={messages.zip}
                value={zip}
                onChange={e => setZip(e.target.value)}
              />
            </div>
          </div>

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.country}
            {...(props.isLabelledWithFor && {target: `country${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`country${iteration}`}
            placeholder={messages.country}
            value={country}
            onChange={e => setCountry(e.target.value)}
          />

          <ButtonsWrap>
            <Button style={BTN_STYLE} onClick={onSubmit} htmlType="submit">
              {messages.save}
            </Button>
            {props.isMultiButton && (
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
  const aSettings = state.settings.address

  return {
    areIdsUnique: aSettings.areIdsUnique,
    hasEmail: aSettings.hasEmail,
    hasName: aSettings.hasName,
    hasPhone: aSettings.hasPhone,
    isFieldset: aSettings.isFieldset,
    isForm: aSettings.isForm,
    isLabelled: aSettings.isLabelled,
    isLabelledWithFor: aSettings.isLabelledWithFor,
    isIframeField: aSettings.isIframeField,
    isMultiButton: aSettings.isMultiButton,
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
function RealIframeField(props: ChildProps) {
  return <iframe>{props.children}</iframe>
}
function FakeIframeField(props: ChildProps) {
  return <>{props.children}</>
}
