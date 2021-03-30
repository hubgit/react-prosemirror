import './style/toolbar.css'

import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { useCallback } from 'react'

import { useEditorState, useEditorView } from './EditorProvider'

export interface ToolbarItem<S extends Schema = any> {
  id: string
  action: (
    state: EditorState<S>,
    dispatch: (tr: Transaction<S>) => void,
    view: EditorView
  ) => boolean
  content: JSX.Element
  title?: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
}

export interface ToolbarGroup<S extends Schema = any> {
  id: string
  items: ToolbarItem<S>[]
}

const ToolbarButton: React.FC<{ item: ToolbarItem<Schema> }> = ({ item }) => {
  const state = useEditorState()
  const view = useEditorView()

  const executeAction = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      item.action(state, view.dispatch, view)
    },
    [item, state, view]
  )

  return (
    <button
      type="button"
      className="prosemirror-toolbar-item"
      data-active={item.active && item.active(state)}
      disabled={item.enable && !item.enable(state)}
      onMouseDown={executeAction}
      title={item.title}
    >
      {item.content}
    </button>
  )
}

const ToolbarGroup: React.FC<{ items: ToolbarItem[] }> = ({ items }) => {
  return (
    <div className="prosemirror-toolbar-group">
      {items.map((item) => (
        <ToolbarButton key={item.id} item={item} />
      ))}
    </div>
  )
}

export const Toolbar: React.FC<{
  toolbar: ToolbarGroup[]
  className?: string
}> = React.memo(({ toolbar, className = '' }) => {
  return (
    <div className={`prosemirror-toolbar ${className}`}>
      {toolbar.map((group) => (
        <ToolbarGroup key={group.id} items={group.items} />
      ))}
    </div>
  )
})
Toolbar.displayName = 'Toolbar'
