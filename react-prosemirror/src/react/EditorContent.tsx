import { EditorView } from 'prosemirror-view'
import React, { useCallback, useEffect } from 'react'

export const EditorContent: React.FC<{
  autoFocus?: boolean
  view: EditorView
}> = ({ autoFocus = false, view }) => {
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
