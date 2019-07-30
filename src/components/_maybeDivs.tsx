import React from 'react'

type Props = {
  isActive: boolean
  children: React.ReactNode
}

const maybeDivs: React.FC<Props> = props => {
  let wrap

  if (props.isActive) {
    wrap = (
      <div>
        <div>{props.children}</div>
      </div>
    )
  } else {
    wrap = <>{props.children}</>
  }

  return wrap
}
export default React.memo(maybeDivs)
