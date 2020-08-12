import { Extension } from '@pompom/core'
import { Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

type EventHandler = (event: Event) => boolean
type ViewEventHandler = (view: EditorView, event: Event) => boolean

export const focus = ({
  onBlur,
  onFocus,
}: {
  onBlur?: EventHandler
  onFocus?: EventHandler
}): Extension => {
  const handleDOMEvents: Record<string, ViewEventHandler> = {}

  if (onBlur) {
    handleDOMEvents.blur = (view, event) => onBlur(event)
  }

  if (onFocus) {
    handleDOMEvents.focus = (view, event) => onFocus(event)
  }

  return {
    plugins: () => ({
      focus: new Plugin({
        props: {
          handleDOMEvents,
        },
      }),
    }),
  }
}
