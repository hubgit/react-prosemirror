// import { codeBlock } from '@pompom/code-block'
import {
  basic,
  blockquote,
  code,
  emphasis,
  focus,
  heading,
  history,
  paragraph,
  placeholder,
  strikethrough,
  strong,
  subscript,
  superscript,
  underline,
} from '@pompom/extensions'
import { EditorContent, EditorProvider } from '@pompom/react'
import { HTMLTransformer } from '@pompom/transformers'
import React, { useMemo } from 'react'

import { FloatingToolbar } from './FloatingToolbar'
import { MainToolbar } from './MainToolbar'

export const RichText = React.memo<{
  autoFocus?: boolean
  value?: string
  handleChange?: (value: string) => void
  onBlur?: (event: Event) => boolean
  onFocus?: (event: Event) => boolean
}>(({ autoFocus, handleChange, onBlur, onFocus, value = '' }) => {
  const extensions = useMemo(
    () => [
      basic,
      paragraph, // note: must be first block
      blockquote,
      code,
      // codeBlock,
      emphasis,
      focus({ onBlur, onFocus }),
      heading,
      history,
      placeholder,
      strikethrough,
      strong,
      subscript,
      superscript,
      underline,
    ],
    [onBlur, onFocus]
  )

  return (
    <EditorProvider<string>
      extensions={extensions}
      handleChange={handleChange}
      transformer={HTMLTransformer}
      value={String(value)}
    >
      <FloatingToolbar />
      <MainToolbar />
      <EditorContent autoFocus={autoFocus} />
    </EditorProvider>
  )
})
