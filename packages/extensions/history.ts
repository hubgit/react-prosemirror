import { Extension } from '@pompom/core'
import { history as historyPlugin, redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'

export const history: Extension = {
  actions: () => ({
    undo: {
      label: 'Undo',
      title: 'Undo',
      key: 'Mod-z',
      run: undo,
    },
    redo: {
      label: 'Redo',
      title: 'Redo',
      key: 'Shift-Mod-z',
      run: redo,
    },
    undoInputRule: {
      label: 'Undo',
      title: 'Undo',
      key: 'Backspace',
      run: undoInputRule,
    },
  }),
  plugins: () => ({
    history: historyPlugin(),
  }),
}
