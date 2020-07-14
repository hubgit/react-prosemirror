import React, { useContext, useMemo, useRef } from 'react'

import { EditorContext } from '../components'

export const Floater: React.FC = ({ children }) => {
  const { view, state } = useContext(EditorContext)

  const floaterRef = useRef<HTMLDivElement>(null)

  const style = useMemo(() => {
    if (!floaterRef.current) {
      return { left: -1000, top: 0 }
    }

    const { selection } = state

    if (!selection || selection.empty) {
      return { left: -1000, top: 0 }
    }

    const coords = view.coordsAtPos(selection.$anchor.pos)

    const { offsetWidth } = floaterRef.current

    return {
      left:
        window.innerWidth - offsetWidth < coords.left
          ? coords.left - offsetWidth + 20
          : coords.left,
      top: coords.top + 30,
      // top: coords.top - 40 > 0 ? coords.top - 40 : coords.top + 30,
    }
  }, [state, view, floaterRef])

  return (
    <div ref={floaterRef} className={'ProseMirror-floater'} style={style}>
      {children}
    </div>
  )
}
