import React, { useCallback } from 'react'

import { usePomPom } from './EditorProvider'

export interface EditorContentProps {
  autoFocus?: boolean
}

export const EditorContent: React.FC<EditorContentProps> = ({
  autoFocus = false,
}) => {
  const { pompom } = usePomPom()

  const editorRef = useCallback(
    (container: HTMLDivElement | null) => {
      if (container) {
        container.appendChild(pompom.view.dom)

        if (autoFocus) {
          pompom.view.focus()
        }
      }
    },
    [pompom, autoFocus]
  )

  return <div className={'pompom-content'} ref={editorRef} />
}
