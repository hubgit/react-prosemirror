import { EditorContent, EditorProvider } from '@pompom/editor'
import { createHtmlTransformer } from '@pompom/transformers'
import { baseKeymap } from 'prosemirror-commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { EditorProps } from 'prosemirror-view'
import React, { useMemo } from 'react'

import { MainToolbar } from './components'
import { keys, rules } from './plugins'
import { EditorSchema, schema } from './schema'
import { paragraphView } from './views'

const plugins = [
  history(), // undo/redo
  keys, // custom keymap
  keymap(baseKeymap), // base keymap
  rules, // input rules
]

const transformer = createHtmlTransformer<EditorSchema>(schema)

export const HTMLEditor = React.memo<{
  autoFocus?: boolean
  handleBlur?: (event: Event) => void
  handleChange: (value: string) => void
  handleFocus?: (event: Event) => void
  value: string
}>(
  ({
    autoFocus = false,
    handleBlur,
    handleChange,
    handleFocus,
    value = '',
  }) => {
    const editorProps = useMemo<EditorProps<unknown, EditorSchema>>(
      () => ({
        handleDOMEvents: {
          blur: (view, event) => {
            handleBlur && handleBlur(event)
            return false
          },
          focus: (view, event) => {
            handleFocus && handleFocus(event)
            return false
          },
        },
        nodeViews: {
          paragraph: paragraphView,
        },
        scrollMargin: 16,
        scrollThreshold: 16,
      }),
      [handleBlur, handleFocus]
    )

    return (
      <EditorProvider
        editorProps={editorProps}
        handleChange={handleChange}
        plugins={plugins}
        schema={schema}
        transformer={transformer}
        value={value}
      >
        <MainToolbar />
        <EditorContent autoFocus={autoFocus} />
      </EditorProvider>
    )
  }
)
