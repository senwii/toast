import React, { useState, useRef, useEffect } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/comment/comment'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neo.css'

import Toast from '../../Toast'

import './style.less'

import './interface'

export default function CodeField(props:CodeFieldProp) {
  const textareaRef = useRef(null as unknown as HTMLTextAreaElement)
  const presentZoneRef = useRef(null as unknown as HTMLObjectElement)
  const runBtnRef = useRef(null as unknown as HTMLObjectElement)
  const [editor, setEditor] = useState(null as unknown as CodeMirror.EditorFromTextArea)

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(textareaRef.current, {
      value: '',
      mode: 'javascript',
      keyMap: 'sublime',
      lineNumbers: true,
      theme: 'neo',
      readOnly: props.readonly ? 'nocursor' : false,
    })

    setEditor(cm)

    if (runBtnRef.current) {
      const handler = run.bind({ Toast })
      cm.getWrapperElement().appendChild(runBtnRef.current)
      runBtnRef.current.addEventListener('click', handler)
    }
  }, [])

  function run(this: any) {
    if (!editor) {
      return
    }
    const doc = editor.getDoc()
    const execStr = doc.getValue()
    let container
    if (props.sandboxId) {
      container = presentZoneRef.current.querySelector('.toast-group-container')
    } else if (props.attachment) {
      container = props.attachment.querySelector('.toast-group-container')
    }
    container?.remove()
    try {
      Function(
      'ctx',
      `with (ctx){
          ${execStr}
      }`,
      )(this)
    } catch(err) {}
  }

  return (
    <div className="code-field-root">
      <textarea
          ref={textareaRef}
          onChange={() => {}}
          value={props.code}
      />
      {
        props.runBtn && <div ref={runBtnRef} className="run-btn" onClick={run.bind({Toast})}>run</div>
      }
      {
        props.sandboxId && <div ref={presentZoneRef} id={props.sandboxId} data-id={`#${props.sandboxId}`} className="presentation-zone" />
      }
    </div>
  )
}
