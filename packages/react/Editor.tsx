import 'prosemirror-view/style/prosemirror.css'
import './style/prosemirror.css'

import React, { useCallback, useEffect } from 'react'

import { useEditorView } from './EditorProvider'

export const Editor: React.FC<{ autoFocus?: boolean }> = React.memo(
  ({ autoFocus = false }) => {
    const view = useEditorView()

    const editorRef = useCallback(
      (element: HTMLDivElement | null) => {
        if (element) {
          element.appendChild(view.dom)
        }
      },
      [view]
    )

    useEffect(() => {
      if (autoFocus) {
        view.focus()
      }
    }, [autoFocus, view])

    return <div ref={editorRef} className="prosemirror-editor" />
  }
)
Editor.displayName = 'Editor'
