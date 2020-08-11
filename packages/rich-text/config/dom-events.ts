import { Schema } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'

export type EventHandlers = { [key: string]: (event: Event) => void }

const eventTypes = ['blur', 'focus']

type DOMEventHandler<S extends Schema> = (
  view: EditorView<S>,
  event: Event
) => boolean

export const createEventHandlers = <S extends Schema>(
  props: EventHandlers
): Record<string, DOMEventHandler<S>> => {
  const handlers: Record<string, DOMEventHandler<S>> = {}

  for (const eventType of eventTypes) {
    const [first, ...rest] = eventType
    const handlerName = `on${first.toUpperCase()}${rest.join('')}`

    if (handlerName in props) {
      handlers[eventType] = (view: EditorView<S>, event: Event) => {
        props[handlerName](event)
        return false
      }
    }
  }

  return handlers
}
