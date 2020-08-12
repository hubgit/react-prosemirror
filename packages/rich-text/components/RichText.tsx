import { codeBlock } from '@pompom/code-block'
import { basic } from '@pompom/extensions/basic'
import { code } from '@pompom/extensions/code'
import { emphasis } from '@pompom/extensions/emphasis'
import { focus } from '@pompom/extensions/focus'
import { heading } from '@pompom/extensions/heading'
import { history } from '@pompom/extensions/history'
import { paragraph } from '@pompom/extensions/paragraph'
import { placeholder } from '@pompom/extensions/placeholder'
import { strikethrough } from '@pompom/extensions/strikethrough'
import { strong } from '@pompom/extensions/strong'
import { subscript } from '@pompom/extensions/subscript'
import { superscript } from '@pompom/extensions/superscript'
import { underline } from '@pompom/extensions/underline'
import { EditorContent, EditorProvider } from '@pompom/react'
import { HTMLTransformer } from '@pompom/transformers'
import React, { useMemo } from 'react'

import { FloatingToolbar } from './FloatingToolbar'
import { MainToolbar } from './MainToolbar'

export const RichText = React.memo<
  React.DOMAttributes<HTMLTextAreaElement> & {
    autoFocus?: boolean
    value?: string
    handleChange: (value: string) => void
  }
>(({ autoFocus, value = '', onBlur, onFocus, ...props }) => {
  const extensions = useMemo(
    () => [
      basic,
      paragraph,
      code,
      codeBlock,
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
    [props]
  )

  return (
    <EditorProvider
      extensions={extensions}
      transformer={HTMLTransformer}
      value={String(value)}
      {...props}
    >
      <FloatingToolbar />
      <MainToolbar />
      <EditorContent autoFocus={autoFocus} />
    </EditorProvider>
  )
})
