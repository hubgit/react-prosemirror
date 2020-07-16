import React, { useCallback, useContext } from 'react'

import { EditorContext } from './EditorProvider'

export const EditorContent: React.FC<{ autoFocus?: boolean }> = ({
  autoFocus = false,
}) => {
  const { view } = useContext(EditorContext)

  const editorRef = useCallback(
    (container: HTMLDivElement | null) => {
      if (container) {
        container.appendChild(view.dom)

        if (autoFocus) {
          view.focus()
        }
      }
    },
    [view, autoFocus]
  )

  return <div className={'ProseMirror-content'} ref={editorRef} />
}
