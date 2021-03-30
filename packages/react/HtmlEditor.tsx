import {
  createHTMLTransformer,
  ProsemirrorTransformer,
} from '@aeaton/prosemirror-transformers'
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import React, { useState } from 'react'

import { ChangeHandler } from './ChangeHandler'
import { EditorProvider } from './EditorProvider'

export const HtmlEditor: React.FC<{
  schema: Schema
  plugins: Plugin[]
  value: string
  handleChange: (value: string) => void
  debounce?: number
}> = ({ schema, plugins, value, handleChange, debounce, children }) => {
  const [htmlTransformer] = useState<ProsemirrorTransformer>(() =>
    createHTMLTransformer(schema)
  )

  const [initialDoc] = useState<ProsemirrorNode>(() =>
    htmlTransformer.parse(value)
  )

  return (
    <EditorProvider plugins={plugins} doc={initialDoc}>
      <ChangeHandler
        transformer={htmlTransformer}
        handleChange={handleChange}
        debounce={debounce}
      />
      {children}
    </EditorProvider>
  )
}
