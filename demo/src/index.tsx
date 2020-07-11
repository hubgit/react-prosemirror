import 'prosemirror-view/style/prosemirror.css'
import 'react-prosemirror/styles/editor.css'
import 'react-prosemirror/styles/floater.css'
import 'react-prosemirror/styles/placeholder.css'
import 'react-prosemirror/styles/toolbar.css'
import '../styles/demo.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HTMLEditor } from 'react-prosemirror-html-editor'

// TODO: routes

ReactDOM.render(
  <HTMLEditor
    autoFocus={true}
    handleChange={(output: string) => {
      console.log(output)
    }}
    value={`<p>Hello World!</p>`}
  />,
  document.querySelector('#root')
)
