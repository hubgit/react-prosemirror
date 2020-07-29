import {
  EditorContent,
  EditorContentProps,
  EditorFieldProps,
  PomPom,
} from '@pompom/react'
import React, { useMemo } from 'react'

import { createConfig, EditorConfigProps } from '../config'
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
    <PomPom config={config} {...props}>
      <MainToolbar />
      <EditorContent autoFocus={autoFocus} />
    </PomPom>
  )
})
