import React from 'react'
import ReactDOM from 'react-dom'
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'

ReactDOM.render(
  <HtmlEditor
    options={options}
    value={`<h1>This is a title</h1><p>This is a paragraph</p>`}
    onChange={value => console.log(value)}
    render={({ editor, state, dispatch }) => (
      <div>
        <MenuBar menu={menu} state={state} dispatch={dispatch}/>
        {editor}
      </div>
    )}
  />,
  document.getElementById('root')
)
