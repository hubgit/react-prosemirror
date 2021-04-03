import './style/toolbar.css'

import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

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

const ToolbarButton: React.FC<{
  item: ToolbarItem<Schema>
  focusId?: string
  setFocusId: (id: string) => void
}> = ({ item, focusId, setFocusId }) => {
  const state = useEditorState()
  const view = useEditorView()

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setFocusId(item.id)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      item.action(state, view.dispatch, view)
    },
    [item, setFocusId, state, view]
  )

  const active = item.active && item.active(state)
  const disabled = item.enable && !item.enable(state)

  return (
    <button
      type="button"
      className="prosemirror-toolbar-item"
      disabled={disabled}
      onMouseDown={handleMouseDown}
      title={item.title}
      aria-pressed={active ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      data-id={item.id}
      tabIndex={focusId === item.id ? 0 : -1}
    >
      {item.content}
    </button>
  )
}

const ToolbarGroup: React.FC<{
  items: ToolbarItem[]
  focusId?: string
  setFocusId: (id: string) => void
}> = ({ items, focusId, setFocusId }) => {
  return (
    <div className="prosemirror-toolbar-group">
      {items.map((item) => (
        <ToolbarButton
          key={item.id}
          item={item}
          focusId={focusId}
          setFocusId={setFocusId}
        />
      ))}
    </div>
  )
}

export const Toolbar: React.FC<{
  toolbar: ToolbarGroup[]
  className?: string
}> = React.memo(({ toolbar, className = '' }) => {
  const view = useEditorView()

  const containerRef = useRef<HTMLDivElement>(null)

  const [focusId, setFocusId] = useState<string>(() => toolbar[0].items[0].id)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const buttons = Array.from(container.querySelectorAll('button'))

    // setFocusId(buttons[0].dataset.id)

    const keydownHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          {
            const focusIndex = buttons.findIndex(
              (button) => button.dataset.id === focusId
            )

            for (let i = focusIndex - 1; i >= 0; i--) {
              const button = buttons[i]

              if (!button.disabled) {
                setFocusId(button.dataset.id as string)
                button.focus()
                break
              }
            }
          }
          break

        case 'ArrowRight':
          {
            const focusIndex = buttons.findIndex(
              (button) => button.dataset.id === focusId
            )

            for (let i = focusIndex + 1; i < buttons.length; i++) {
              const button = buttons[i]

              if (!button.disabled) {
                setFocusId(button.dataset.id as string)
                button.focus()
                break
              }
            }
          }
          break
      }
    }

    for (const button of buttons) {
      button.addEventListener('click', () => {
        for (const button of buttons) {
          button.tabIndex = -1
        }
        button.tabIndex = 0
      })
    }

    container.addEventListener('keydown', keydownHandler)

    return () => {
      container.removeEventListener('keydown', keydownHandler)
    }
  }, [focusId])

  return (
    <div
      className={`prosemirror-toolbar ${className}`}
      role="toolbar"
      aria-label="Text Formatting"
      aria-controls={view.props?.attributes?.id}
      ref={containerRef}
    >
      {toolbar.map((group) => (
        <ToolbarGroup
          key={group.id}
          items={group.items}
          focusId={focusId}
          setFocusId={setFocusId}
        />
      ))}
    </div>
  )
})
Toolbar.displayName = 'Toolbar'
