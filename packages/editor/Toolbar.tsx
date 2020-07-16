import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { PropsWithChildren, ReactElement, useContext } from 'react'

import { EditorContext } from './EditorProvider'

export const Toolbar: React.FC = ({ children }) => (
  <div className={'ProseMirror-toolbar'}>{children}</div>
)

export const ToolbarGroup: React.FC = ({ children }) => (
  <div className={'ProseMirror-toolbar-group'}>{children}</div>
)

export interface ToolbarItemSpec<S extends Schema> {
  title?: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
  run: (
    state: EditorState<S>,
    dispatch: (transaction: Transaction<S>) => void,
    view: EditorView<S>,
    event: Event
  ) => boolean
}

// TODO: press button with keyboard

export const ToolbarItem = <S extends Schema>({
  item,
  children,
}: PropsWithChildren<{ item: ToolbarItemSpec<Schema> }>): ReactElement => {
  const { active, enable, title, run } = item

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

// export const ToolbarItem = React.memo(ToolbarInner) as typeof ToolbarInner
