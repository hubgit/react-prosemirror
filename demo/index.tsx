import 'prosemirror-tables/style/tables.css'
import 'prosemirror-view/style/prosemirror.css'
import '@pompom/react/styles/editor.css'
import '@pompom/react/styles/floater.css'
import '@pompom/react/styles/toolbar.css'
import './styles/demo.css'

import { RichTextEditor } from '@pompom/rich-text'
import React from 'react'
import ReactDOM from 'react-dom'

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
