import { Action } from '@pompom/core'
import React, { PropsWithChildren, ReactElement } from 'react'

import { usePomPom } from './EditorProvider'

export const Toolbar: React.FC = ({ children }) => (
  <div className={'pompom-toolbar'}>{children}</div>
)

export const ToolbarGroup: React.FC = ({ children }) => (
  <div className={'pompom-toolbar-group'}>{children}</div>
)

// TODO: press button with keyboard

export const ToolbarItem = ({
  action,
  children,
}: PropsWithChildren<{ action: Action }>): ReactElement => {
  const { active, enable, title, run } = action

  const { pompom, state } = usePomPom()

  return (
    <button
      type={'button'}
      className={'pompom-toolbar-item'}
      data-active={active && active(state)}
      disabled={enable && !enable(state)}
      title={title}
      onMouseDown={(event) => {
        event.preventDefault()
        run(state, pompom.view.dispatch, pompom.view)
        // run(view.state, view.dispatch, view, event.nativeEvent)
      }}
    >
      {children}
    </button>
  )
}

// export const ToolbarItem = React.memo(ToolbarInner) as typeof ToolbarInner
