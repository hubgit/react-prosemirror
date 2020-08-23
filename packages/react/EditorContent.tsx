import { EditorView } from 'prosemirror-view'
import React, { useCallback, useEffect, useMemo } from 'react'

import { useEditorContext } from './EditorProvider'

export const EditorContent: React.FC<{
  autoFocus?: boolean
}> = ({ autoFocus = false }) => {
  const { state, dispatch: dispatchTransaction } = useEditorContext()

  const view = useMemo(
    () => new EditorView(undefined, { state, dispatchTransaction }),
    [dispatchTransaction]
  )

  useEffect(() => {
    view.updateState(state)
  }, [state])

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
