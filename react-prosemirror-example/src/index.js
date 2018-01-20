import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Editor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'

const Container = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Input = styled('div')`
  width: 100%;
  height: 50%;
  overflow-y: auto;
`

const Output = styled('pre')`
  width: 100%;
  height: 50%;
  overflow-y: auto;
  padding: 1em;
  background: black;
  color: lawngreen;
`

ReactDOM.render(
  <Container>
    <Input>
      <Editor
        options={options}
        value={`<h1>This is a title</h1><p>This is a paragraph</p>`}
        onChange={value => {
          document.getElementById('output').textContent = JSON.stringify(value, null, 2)
        }}
        render={({ editor, state, dispatch }) => (
          <React.Fragment>
            <MenuBar menu={menu} state={state} dispatch={dispatch} />
            {editor}
          </React.Fragment>
        )}
      />
    </Input>
    <Output id={'output'} />
  </Container>,
  document.getElementById('root')
)
