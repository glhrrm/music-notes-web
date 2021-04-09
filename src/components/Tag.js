import { React, useEffect, useState } from 'react'

const Tag = (props) => {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(props.text)
  }, [props])

  return (
    <div className="tag" onChange={e => setText(e.target.value)}>{text}</div>
  )
}

export default Tag