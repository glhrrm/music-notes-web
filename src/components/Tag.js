import { React, useEffect, useState } from 'react'
import '../styles/components/tag.css'

const Tag = (props) => {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(props.text)
  }, [props])

  return (
    <div
      className="tag"
      contentEditable={props.editable}
      suppressContentEditableWarning={true}
      role="textbox"
      onChange={e => setText(e.target.value)}
      onBlur={props.onBlur}>
      {text}
    </div>
  )
}

export default Tag