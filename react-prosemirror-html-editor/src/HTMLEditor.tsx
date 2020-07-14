import { EditorProps } from 'prosemirror-view'
import React, { useMemo } from 'react'
import {
  createHtmlTransformer,
  EditorContent,
  EditorProvider,
} from 'react-prosemirror'

import { FloatingToolbar } from './FloatingToolbar'
import { MainToolbar } from './MainToolbar'
import * as nodeViews from './nodeViews'
import { plugins } from './plugins'
import { EditorSchema, schema } from './schema'

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
        nodeViews,
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
        <FloatingToolbar />
      </EditorProvider>
    )
  }
)
