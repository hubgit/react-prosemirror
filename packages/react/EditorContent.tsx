import React, { useCallback, useContext } from 'react'

import { EditorContext } from './EditorProvider'

export interface EditorContentProps {
  autoFocus?: boolean
}

export const EditorContent: React.FC<EditorContentProps> = ({
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

  return <div className={'pompom-content'} ref={editorRef} />
}
