import React from 'react'

type Props = {
  isActive: boolean
  children: React.ReactNode
}

const maybeDivWrap: React.FC<Props> = props => {
  let wrap

  if (props.isActive) {
    wrap = <div>{props.children}</div>
  } else {
    wrap = <>{props.children}</>
  }

  return wrap
}
export default React.memo(maybeDivWrap)
