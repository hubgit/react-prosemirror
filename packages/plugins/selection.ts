import { Plugin, PluginKey } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

interface PluginState {
  start?: Position
  end?: Position
}

export const selectionKey = new PluginKey<PluginState>('selection')

interface Position {
  left: number
  right: number
  top: number
  bottom: number
}

export const selection = () => {
  let editorView: EditorView

  return new Plugin<PluginState>({
    key: selectionKey,
    view: (view) => {
      editorView = view
      return {}
    },
    state: {
      init: () => {
        return {}
      },
      apply: (tr, value, oldState, newState) => {
        const { from, to } = newState.selection

        const start = editorView.coordsAtPos(from)
        const end = editorView.coordsAtPos(to)

        return { start, end }
      },
    },
  })
}
