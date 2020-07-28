// import { codeBlockView } from '@pompom/code-block'
import { EditorContent, EditorProvider } from '@pompom/react'
import { EditorProps } from 'prosemirror-view'
import React, { useMemo } from 'react'

import { EditorSchema, plugins, schema, transformer } from '../config'
import { MainToolbar } from './MainToolbar'

export const RichText = React.memo<{
  autoFocus?: boolean
  onBlur?: (event: Event) => void
  onChange: (value: string) => void
  onFocus?: (event: Event) => void
  value?: string
}>(({ autoFocus = false, onBlur, onChange, onFocus, value }) => {
  const editorProps = useMemo(
    (): EditorProps<unknown, EditorSchema> => ({
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
        // codeBlock: codeBlockView,
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
