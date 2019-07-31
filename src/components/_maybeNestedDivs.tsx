import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 100%;
`

type Props = {
  hasRandomText: boolean
  isActive: boolean
  children: React.ReactNode
}

const maybeNestedDivs: React.FC<Props> = props => {
  let wrap

  if (props.isActive) {
    wrap = (
      <Div>
        {props.hasRandomText && String(Math.round(Math.random() * 1000000))}
        <Div>{props.children}</Div>
      </Div>
    )
  } else {
    wrap = <>{props.children}</>
  }

  return wrap
}
export default React.memo(maybeNestedDivs)
