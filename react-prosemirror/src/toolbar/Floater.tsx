import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { PropsWithChildren, ReactElement, useMemo, useRef } from 'react'

export const Floater = ({
  view,
  state,
  children,
}: PropsWithChildren<{
  view: EditorView
  state: EditorState
}>): ReactElement => {
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
      top: coords.top - 40 > 0 ? coords.top - 40 : coords.top + 20,
    }
  }, [state, view, floaterRef])

  return (
    <div ref={floaterRef} className={'ProseMirror-floater'} style={style}>
      {children}
    </div>
  )
}
