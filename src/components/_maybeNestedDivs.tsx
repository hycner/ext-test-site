import React from 'react'

type Props = {
  hasRandomText: boolean
  isActive: boolean
  children: React.ReactNode
}

const maybeNestedDivs: React.FC<Props> = props => {
  let wrap

  if (props.isActive) {
    wrap = (
      <div>
        {props.hasRandomText && String(Math.round(Math.random() * 1000000))}
        <div>{props.children}</div>
      </div>
    )
  } else {
    wrap = <>{props.children}</>
  }

  return wrap
}
export default React.memo(maybeNestedDivs)
