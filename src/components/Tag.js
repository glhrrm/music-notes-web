import { React, useEffect, useState } from 'react'
import '../styles/components/tag.css'

const Tag = (props) => {
  const [text, setText] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    setText(props.text)
  }, [props])

  const expand = () => setExpanded(!expanded)

  const deleteTag = () => setDeleted(!deleted)

  return (
    !deleted
      ? <div
        className="tag"
        ref={input => input && input.focus()}
        contentEditable={props.editable}
        suppressContentEditableWarning={true}
        role="textbox"
        deleted={deleted}
        onClick={expand}
        onChange={e => setText(e.target.value)}
        onBlur={props.onBlur}>
        {text}
        {expanded
          ? <button
            contentEditable={false}
            className="delete-tag"
            onClick={deleteTag}>🗙</button>
          : null}
      </div>
      : null
  )
}

export default Tag