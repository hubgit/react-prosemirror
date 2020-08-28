import React, { useMemo, useRef } from 'react'

import { useEditorContext } from './EditorProvider'

export const Floater: React.FC = ({ children }) => {
  const { view, state } = useEditorContext()

  const ref = useRef<HTMLDivElement>(null)

  const style = useMemo(() => {
    if (!ref.current) {
      return { left: -1000, top: 0 }
    }

    const { selection } = state

    if (!selection || selection.empty) {
      return { left: -1000, top: 0 }
    }

    const coords = view.coordsAtPos(selection.$anchor.pos)

    const { offsetWidth } = ref.current

    return {
      left:
        window.innerWidth - offsetWidth < coords.left
          ? coords.left - offsetWidth + 20
          : coords.left,
      top: coords.top + 30,
      // top: coords.top - 40 > 0 ? coords.top - 40 : coords.top + 30,
    }
  }, [state, view, ref])

  return (
    <div ref={ref} className={'pompom-floater'} style={style}>
      {children}
    </div>
  )
}
