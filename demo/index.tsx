import 'prosemirror-view/style/prosemirror.css'
import '@pompom/editor/styles/editor.css'
import '@pompom/editor/styles/floater.css'
import '@pompom/editor/styles/toolbar.css'
import './styles/demo.css'

import { RichText } from '@pompom/rich-text'
import React from 'react'
import ReactDOM from 'react-dom'

// TODO: routes

ReactDOM.render(
  <RichText
    autoFocus={true}
    onChange={(output: string) => {
      console.log(output)
    }}
    value={`<p>Hello World!</p>`}
    // value={''}
  />,
  document.querySelector('#root')
)
