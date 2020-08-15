import { Action } from '@pompom/core'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React from 'react'

import { useEditorContext } from './EditorProvider'

export type ToolbarItems = Array<{
  id: string
  items: Array<Action>
}>

const ToolbarItem = ({ action }: { action: Action }) => {
  const { view, state } = useEditorContext()

  return (
    <button
      type={'button'}
      className={'pompom-toolbar-item'}
      data-active={action.active && action.active(state)}
      disabled={action.enable && !action.enable(state)}
      title={action.title}
      onMouseDown={(event) => {
        event.preventDefault()
        action.run(state, view.dispatch, view)
      }}
    >
      {action.icon || '?'}
    </button>
  )
}

export const Toolbar: React.FC<{
  items: ToolbarItems
}> = ({ items }) => (
  <div className={'pompom-toolbar'}>
    {items.map((group) => (
      <div className={'pompom-toolbar-group'} key={group.id}>
        {group.items.map((action) => (
          <ToolbarItem action={action} key={action.id} />
        ))}
      </div>
    ))}
  </div>
)
