import { EditorContent, EditorProvider } from '@pompom/editor'
import { createHtmlTransformer } from '@pompom/transformers'
import { baseKeymap } from 'prosemirror-commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { EditorProps } from 'prosemirror-view'
import React, { useMemo } from 'react'

import { MainToolbar } from './components'
import { keys, placeholder, rules } from './plugins'
import { EditorSchema, schema } from './schema'
import { codeBlockView } from './views/code_block'
// import { paragraphView } from './views'

const plugins = [
  history(), // undo/redo
  keys, // custom keymap
  keymap(baseKeymap), // base keymap
  placeholder,
  rules, // input rules
]

const transformer = createHtmlTransformer<EditorSchema>(schema)

export const RichText = React.memo<{
  autoFocus?: boolean
  onBlur?: (event: Event) => void
  onChange: (value: string) => void
  onFocus?: (event: Event) => void
  value: string
}>(({ autoFocus = false, onBlur, onChange, onFocus, value = '' }) => {
  const editorProps = useMemo<EditorProps<unknown, EditorSchema>>(
    () => ({
      handleDOMEvents: {
        blur: (view, event) => {
          onBlur && onBlur(event)
          return false
        },
        focus: (view, event) => {
          onFocus && onFocus(event)
          return false
        },
      },
      nodeViews: {
        // paragraph: paragraphView,
        code_block: codeBlockView,
      },
      scrollMargin: 16,
      scrollThreshold: 16,
    }),
    [onBlur, onFocus]
  )

  return (
    <EditorProvider
      editorProps={editorProps}
      handleChange={onChange}
      plugins={plugins}
      schema={schema}
      transformer={transformer}
      value={value}
    >
      <MainToolbar />
      <EditorContent autoFocus={autoFocus} />
    </EditorProvider>
  )
})
