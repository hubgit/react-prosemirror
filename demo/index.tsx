import 'prosemirror-view/style/prosemirror.css'
import '@pompom/react/styles/editor.css'
import '@pompom/react/styles/floater.css'
import '@pompom/react/styles/toolbar.css'
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
  />,
  document.querySelector('#root')
)
