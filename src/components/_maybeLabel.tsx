import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  width: 100%;
  padding-left: 10px;
`

type Props = {
  isActive: boolean
  label: string
  target: string
}

const maybeLabel: React.FC<Props> = props => {
  if (!props.isActive) return null

  return <Label htmlFor={props.target}>{props.label}</Label>
}
export default React.memo(maybeLabel)
