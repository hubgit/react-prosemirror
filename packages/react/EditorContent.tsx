import React, { useCallback, useEffect } from 'react'

import { useEditorContext } from './EditorProvider'

export const EditorContent: React.FC<{
  autoFocus?: boolean
}> = ({ autoFocus = false }) => {
  const { view } = useEditorContext()

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
