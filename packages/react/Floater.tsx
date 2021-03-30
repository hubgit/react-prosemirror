import './style/floater.css'

import React, { useMemo, useRef } from 'react'

import { useEditorState, useEditorView } from './EditorProvider'

export const Floater: React.FC = ({ children }) => {
  const view = useEditorView()
  const state = useEditorState()

  const menuRef = useRef<HTMLDivElement>(null)

  const style = useMemo(() => {
    if (!state.selection || state.selection.empty) {
      return { left: -1000, top: 0 }
    }

    const coords = view.coordsAtPos(state.selection.$anchor.pos)

    const offsetWidth = menuRef.current?.offsetWidth || 0

    return {
      left:
        window.innerWidth - offsetWidth < coords.left
          ? coords.left - offsetWidth + 20
          : coords.left,
      top: coords.top - 30 > 0 ? coords.top - 30 : coords.top + 30,
    }
  }, [menuRef, state, view])

  return (
    <div ref={menuRef} className="prosemirror-floater" style={style}>
      {children}
    </div>
  )
}
