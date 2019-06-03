import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from 'antd'

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

type Props = {
  areIdsUnique: boolean
  isForm: boolean
  isMultiButton: boolean
  iteration: number
}

const Fields: React.FC<Props> = props => {
  const [country, setCountry] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [streetOne, setStreetOne] = useState<string>('')
  const [streetTwo, setStreetTwo] = useState<string>('')

  function onSubmit() {
    console.log(`Address (${props.iteration}) submit clicked`)
    console.log({
      country,
      name,
      streetOne,
      streetTwo,
    })
  }

  function onClear() {
    console.log(`Address (${props.iteration}) clear clicked`)
    setCountry('')
    setName('')
    setStreetOne('')
    setStreetTwo('')
  }

  function onNothing() {
    console.log(`Address (${props.iteration}) nothing clicked`)
  }

  let Form = props.isForm ? RealForm : FakeForm

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
export default Fields

type FormProps = {
  children: any
}
function RealForm(props: FormProps) {
  return <form>{props.children}</form>
}
function FakeForm(props: FormProps) {
  return <>{props.children}</>
}
