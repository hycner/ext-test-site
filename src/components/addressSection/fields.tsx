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
  areAttrIdentifying: boolean
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
                {...(props.isLabelledWithFor && {target: `${messages.name_short}${iteration}`})}
              />
              <Input
                style={FIELD_STYLE}
                id={`${props.areAttrIdentifying ? messages.name_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.name : ''}
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
                  {...(props.isLabelledWithFor && {target: `${messages.email_short}${iteration}`})}
                />
                <Input
                  id={`${props.areAttrIdentifying ? messages.email_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.email : ''}
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
                  {...(props.isLabelledWithFor && {target: `${messages.phone_short}${iteration}`})}
                />
                <Input
                  id={`${props.areAttrIdentifying ? messages.phone_short : ''}${iteration}`}
                  placeholder={props.areAttrIdentifying ? messages.phone : ''}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            )}
          </div>

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.street1}
            {...(props.isLabelledWithFor && {target: `${messages.street1_short}${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`${props.areAttrIdentifying ? messages.street1_short : ''}${iteration}`}
            placeholder={props.areAttrIdentifying ? messages.street1 : ''}
            value={streetOne}
            onChange={e => setStreetOne(e.target.value)}
          />

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.street2}
            {...(props.isLabelledWithFor && {target: `${messages.street2_short}${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`${props.areAttrIdentifying ? messages.street2_short : ''}${iteration}`}
            placeholder={props.areAttrIdentifying ? messages.street2 : ''}
            value={streetTwo}
            onChange={e => setStreetTwo(e.target.value)}
          />

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.city}
            {...(props.isLabelledWithFor && {target: `${messages.city_short}${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`${props.areAttrIdentifying ? messages.city_short : ''}${iteration}`}
            placeholder={props.areAttrIdentifying ? messages.city : ''}
            value={city}
            onChange={e => setCity(e.target.value)}
          />

          <div style={{display: 'flex'}}>
            <div style={FIELD_STYLE}>
              <MaybeLabel
                isActive={props.isLabelled}
                label={messages.state}
                {...(props.isLabelledWithFor && {target: `${messages.state_short}${iteration}`})}
              />
              <Input
                id={`${props.areAttrIdentifying ? messages.state_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.state : ''}
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>

            <div style={FIELD_STYLE}>
              <MaybeLabel
                isActive={props.isLabelled}
                label={messages.zip}
                {...(props.isLabelledWithFor && {target: `${messages.zip_short}${iteration}`})}
              />
              <Input
                id={`${props.areAttrIdentifying ? messages.zip_short : ''}${iteration}`}
                placeholder={props.areAttrIdentifying ? messages.zip : ''}
                value={zip}
                onChange={e => setZip(e.target.value)}
              />
            </div>
          </div>

          <MaybeLabel
            isActive={props.isLabelled}
            label={messages.country}
            {...(props.isLabelledWithFor && {target: `${messages.country_short}${iteration}`})}
          />
          <Input
            style={FIELD_STYLE}
            id={`${props.areAttrIdentifying ? messages.country_short : ''}${iteration}`}
            placeholder={props.areAttrIdentifying ? messages.country : ''}
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
  const settings = state.settings.address

  return {
    areAttrIdentifying: settings.areAttrIdentifying,
    areIdsUnique: settings.areIdsUnique,
    hasEmail: settings.hasEmail,
    hasName: settings.hasName,
    hasPhone: settings.hasPhone,
    isFieldset: settings.isFieldset,
    isForm: settings.isForm,
    isLabelled: settings.isLabelled,
    isLabelledWithFor: settings.isLabelledWithFor,
    isIframeField: settings.isIframeField,
    isMultiButton: settings.isMultiButton,
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
