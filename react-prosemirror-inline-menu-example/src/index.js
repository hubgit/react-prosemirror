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

const EditorWrap = styled('pre')`
  postition: relative;
`

const MenuWrap = styled('pre')`
  postition: absolute;
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
        render={({ editor, state, view, dispatch }) => {
          console.log('Render: ', view);

          let inlineStyles = { top: 0, left: 0, display: "none" };

          if (view) {
            if (state.selection.$anchor.pos !== state.selection.$head.pos) {
              const coords = view.coordsAtPos(state.selection.$anchor.pos);
              inlineStyles = {
                top: coords.top - 35,
                left: coords.left - 100,
                display: "block"
              };
            }
          }

          return (
            <EditorWrap>
              <MenuWrap style={inlineStyles}>
                <MenuBar
                  menu={menu}
                  state={state}
                  dispatch={dispatch}
                />
              </MenuWrap>
              {editor}
            </EditorWrap>
          );
        }}
      />
    </Input>
    <Output id={'output'} />
  </Container>,
  document.getElementById('root')
)
