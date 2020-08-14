import { EditorView } from 'prosemirror-view'
import React, { useCallback, useEffect } from 'react'

export const EditorContent: React.FC<{
  view: EditorView
  autoFocus?: boolean
}> = ({ view, autoFocus = false }) => {
  const ref = useCallback(
    (container: HTMLDivElement | null) => {
      if (container) {
        container.appendChild(view.dom)
      }
    },
    [view]
  )

  useEffect(() => {
    if (autoFocus) {
      view.focus()
    }
  }, [autoFocus, view])

  return <div className={'pompom-content'} ref={ref} />
}
