import {
  Editor,
  EditorContent,
  EditorContentProps,
  EditorFieldProps,
} from '@pompom/react'
import React, { useMemo } from 'react'

import { createConfig, EditorConfigProps } from '../config'
import { FloatingToolbar } from './FloatingToolbar'
import { MainToolbar } from './MainToolbar'

// const config = createConfig()

export const RichText = React.memo<
  EditorConfigProps & EditorContentProps & EditorFieldProps<string>
>(({ autoFocus = false, onBlur, onFocus, ...props }) => {
  const config = useMemo(() => createConfig({ onBlur, onFocus }), [
    onBlur,
    onFocus,
  ])

  return (
    <Editor config={config} {...props}>
      <FloatingToolbar />
      <MainToolbar />
      <EditorContent autoFocus={autoFocus} />
    </Editor>
  )
})
