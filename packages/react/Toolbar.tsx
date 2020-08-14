import { Action } from '@pompom/core'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React from 'react'

export type ToolbarItems = Array<{
  id: string
  items: Array<Action>
}>

export const Toolbar: React.FC<{
  items: ToolbarItems
  state: EditorState
  view: EditorView
}> = ({ items, state, view }) => (
  <div className={'pompom-toolbar'}>
    {items.map((group) => (
      <div className={'pompom-toolbar-group'} key={group.id}>
        {group.items.map((action) => (
          <button
            key={action.id}
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
        ))}
      </div>
    ))}
  </div>
)
