import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 100%;
`

type Props = {
  hasDeepInput: boolean
  hasRandomText: boolean
  hasShallowInput: boolean
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
        {props.hasShallowInput && <input type="text" />}
        {props.hasDeepInput && (
          <Div>
            <input type="text" />
          </Div>
        )}
      </Div>
    )
  } else {
    wrap = <>{props.children}</>
  }

  return wrap
}
export default React.memo(maybeNestedDivs)
