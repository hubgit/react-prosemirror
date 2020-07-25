import { Action } from '@pompom/rich-text/actions'
import { Schema } from 'prosemirror-model'
import React, { PropsWithChildren, ReactElement, useContext } from 'react'

import { EditorContext } from './EditorProvider'

export const Toolbar: React.FC = ({ children }) => (
  <div className={'pompom-toolbar'}>{children}</div>
)

export const ToolbarGroup: React.FC = ({ children }) => (
  <div className={'pompom-toolbar-group'}>{children}</div>
)

// TODO: press button with keyboard

export const ToolbarItem = <S extends Schema>({
  action,
  children,
}: PropsWithChildren<{ action: Action<S> }>): ReactElement => {
  const { active, enable, title, run } = action

  const { view } = useContext(EditorContext)

  return (
    <button
      type={'button'}
      className={'pompom-toolbar-item'}
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
