import { EditorContent, EditorProvider } from '@pompom/react'
import { HTMLTransformer } from '@pompom/transformers'
import { EditorProps } from 'prosemirror-view'
import React, { useMemo } from 'react'

import { MainToolbar } from './components'
import { plugins } from './plugins'
import { EditorSchema, schema } from './schema'
import { codeBlockView } from './views'

const transformer = new HTMLTransformer<EditorSchema>(schema)

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
