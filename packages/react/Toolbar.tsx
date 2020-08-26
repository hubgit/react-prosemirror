import { Command } from 'prosemirror-commands'
import { EditorState } from 'prosemirror-state'
import React from 'react'

import { useEditorContext } from './EditorProvider'

export const ToolbarItem: React.FC<{
  active?: (state: EditorState) => boolean
  enable?: (state: EditorState) => boolean
  run: Command
  title?: string
}> = ({ active, children, enable, run, title }) => {
  const { state, view } = useEditorContext()

  return (
    <button
      type={'button'}
      className={'pompom-toolbar-item'}
      data-active={active && active(state)}
      disabled={enable && !enable(state)}
      title={title}
      onMouseDown={(event) => {
        event.preventDefault()
        run(state, view.dispatch, view)
      }}
    >
      {children || '?'}
    </button>
  )
}

export const ToolbarGroup: React.FC = ({ children }) => (
  <div className={'pompom-toolbar-group'}>{children}</div>
)

export const Toolbar: React.FC = ({ children }) => (
  <div className={'pompom-toolbar'}>{children}</div>
)
