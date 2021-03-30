import './style/floater.css'

import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useEditorState, useEditorView } from './EditorProvider'

export const Floater: React.FC = ({ children }) => {
  const view = useEditorView()
  const state = useEditorState()
  const [needsUpdate, setNeedsUpdate] = useState(Date.now())

  // trigger redraw on resize and scroll events
  useEffect(() => {
    let handle: number

    const handleEvent = () => {
      if (handle) {
        window.clearTimeout(handle)
      }

      handle = window.setTimeout(() => {
        setNeedsUpdate(Date.now())
      }, 50)
    }

    window.addEventListener('resize', handleEvent)
    window.addEventListener('scroll', handleEvent)

    return () => {
      window.removeEventListener('resize', handleEvent)
      window.removeEventListener('scroll', handleEvent)
    }
  }, [])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuRef, state, view, needsUpdate])

  return (
    <div ref={menuRef} className="prosemirror-floater" style={style}>
      {children}
    </div>
  )
}
