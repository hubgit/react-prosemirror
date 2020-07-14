import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { useContext } from 'react'

import { EditorContext } from '../components'
import { DispatchTransaction } from '../types'

export const Toolbar: React.FC = ({ children }) => (
  <div className={'ProseMirror-toolbar'}>{children}</div>
)

export const ToolbarGroup: React.FC = ({ children }) => (
  <div className={'ProseMirror-toolbar-group'}>{children}</div>
)

// TODO: press button with keyboard

export const ToolbarItem: React.FC<{
  title?: string
  active?: (state: EditorState) => boolean
  enable?: (state: EditorState) => boolean
  run: (
    state: EditorState,
    dispatch: DispatchTransaction,
    view: EditorView,
    event: Event
  ) => boolean
}> = ({ active, children, enable, title, run }) => {
  const { view } = useContext(EditorContext)

  return (
    <button
      type={'button'}
      className={'ProseMirror-toolbar-item'}
      data-active={active && active(view.state)}
      disabled={enable && !enable(view.state)}
      title={title}
      onMouseDown={(event) => {
        event.preventDefault()
        run(view.state, view.dispatch, view, event.nativeEvent)
      }}
    >
      {children}
    </button>
  )
}
