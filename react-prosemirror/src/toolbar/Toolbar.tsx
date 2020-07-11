import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { ReactElement } from 'react'

type Dispatch<S extends Schema> = (transaction: Transaction<S>) => void

export interface ToolbarItemSpec<S extends Schema> {
  content: ReactElement
  title?: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
  run: (
    state: EditorState,
    dispatch: Dispatch<S>,
    view: EditorView<S>,
    event: Event
  ) => boolean
}

export type ToolbarSpec<S extends Schema> = Record<
  string,
  Record<string, ToolbarItemSpec<S>>
>

// TODO: press button with keyboard

const Button = <S extends Schema>({
  item,
  state,
  view,
}: {
  item: ToolbarItemSpec<S>
  state: EditorState<S>
  view: EditorView<S>
}) => (
  <button
    type={'button'}
    className={'ProseMirror-toolbar-item'}
    data-active={item.active && item.active(state)}
    disabled={item.enable && !item.enable(state)}
    title={item.title}
    onMouseDown={(event) => {
      event.preventDefault()
      item.run(state, view.dispatch, view, event.nativeEvent)
    }}
  >
    {item.content}
  </button>
)

export const Toolbar = <S extends Schema>({
  toolbar,
  state,
  view,
}: {
  toolbar: ToolbarSpec<S>
  state: EditorState<S>
  view: EditorView<S>
}): ReactElement => (
  <div className={'ProseMirror-toolbar'}>
    {Object.entries(toolbar).map(([key, group]) => (
      <span key={key} className={'ProseMirror-toolbar-group'}>
        {Object.entries(group).map(([key, item]) => (
          <Button<S> key={key} item={item} state={state} view={view} />
        ))}
      </span>
    ))}
  </div>
)
