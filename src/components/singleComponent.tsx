import React, {useState} from 'react'
import {Input} from 'antd'

type Props = {
  component: string
}

const SingleComponent: React.FC<Props> = props => {
  const [value, setValue] = useState<string>('')

  const placeholder = props.component.split('-')[0]

  let Field = props.component === 'password' ? Input.Password : Input

  return (
    <Field
      id={props.component}
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}
export default React.memo(SingleComponent)
