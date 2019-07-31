import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 100%;
`

type Props = {
  isActive: boolean
  children: React.ReactNode
}

const maybeDivWrap: React.FC<Props> = props => {
  let wrap

  if (props.isActive) {
    wrap = <Div>{props.children}</Div>
  } else {
    wrap = <>{props.children}</>
  }

  return wrap
}
export default React.memo(maybeDivWrap)
