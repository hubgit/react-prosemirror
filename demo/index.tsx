import 'prosemirror-tables/style/tables.css'
import 'prosemirror-view/style/prosemirror.css'
import '@aeaton/react-prosemirror/styles/editor.css'
import '@aeaton/react-prosemirror/styles/floater.css'
import '@aeaton/react-prosemirror/styles/toolbar.css'
import './styles/demo.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { RichTextEditor } from './pages/RichTextEditor'

// TODO: routes

ReactDOM.render(
  <RichTextEditor
    autoFocus={true}
    handleChange={(value) => {
      console.log(value)
    }}
    value={'Hello world!'}
  />,
  document.querySelector('#root')
)
