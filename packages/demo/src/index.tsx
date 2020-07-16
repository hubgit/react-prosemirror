import 'prosemirror-view/style/prosemirror.css'
import '@pompom/core/styles/editor.css'
import '@pompom/core/styles/floater.css'
import '@pompom/core/styles/toolbar.css'
import '../styles/demo.css'

import { HTMLEditor } from '@pompom/html-editor'
import React from 'react'
import ReactDOM from 'react-dom'

// TODO: routes

ReactDOM.render(
  <HTMLEditor
    autoFocus={true}
    handleChange={(output: string) => {
      console.log(output)
    }}
    value={`<p>Hello World!</p>`}
    // value={''}
  />,
  document.querySelector('#root')
)
