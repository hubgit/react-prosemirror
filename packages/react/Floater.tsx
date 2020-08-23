import { selectionKey } from '@pompom/plugins'
import React, { useMemo, useRef } from 'react'

import { useEditorContext } from './EditorProvider'

const OUTSIDE = { left: -1000, top: 0 }

export const Floater: React.FC = ({ children }) => {
  const { state } = useEditorContext()

  const selectionState = selectionKey.getState(state)

  const ref = useRef<HTMLDivElement>(null)

  const style = useMemo(() => {
    if (!ref.current) {
      return OUTSIDE
    }

    const { selection } = state

    if (!selection || selection.empty) {
      return OUTSIDE
    }

    const { offsetParent } = ref.current

    if (!offsetParent) {
      return OUTSIDE
    }

    const box = offsetParent.getBoundingClientRect()

    if (!selectionState) {
      return OUTSIDE
    }

    const { start, end } = selectionState

    if (!start || !end) {
      return OUTSIDE
    }

    const left = Math.max((start.left + end.left) / 2, start.left)

    return {
      left: left - box.left,
      bottom: box.bottom - start.top,
    }
  }, [selectionState, state, ref])

  return (
    <div ref={ref} className={'pompom-floater'} style={style}>
      {children}
    </div>
  )
}
