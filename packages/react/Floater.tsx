import React, { useMemo, useRef } from 'react'

import { usePomPom } from './EditorProvider'

export const Floater: React.FC = ({ children }) => {
  const { pompom, state } = usePomPom()

  const floaterRef = useRef<HTMLDivElement>(null)

  const style = useMemo(() => {
    if (!floaterRef.current) {
      return { left: -1000, top: 0 }
    }

    const { selection } = state

    if (!selection || selection.empty) {
      return { left: -1000, top: 0 }
    }

    const coords = pompom.view.coordsAtPos(selection.$anchor.pos)

    const { offsetWidth } = floaterRef.current

    return {
      left:
        window.innerWidth - offsetWidth < coords.left
          ? coords.left - offsetWidth + 20
          : coords.left,
      top: coords.top + 30,
      // top: coords.top - 40 > 0 ? coords.top - 40 : coords.top + 30,
    }
  }, [state, pompom, floaterRef])

  return (
    <div ref={floaterRef} className={'pompom-floater'} style={style}>
      {children}
    </div>
  )
}
