import { Extension } from '@pompom/core'
import { history as historyPlugin, redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'

export const history: Extension = {
  actions: () => ({
    undo: {
      enable: undo,
      run: undo,
    },
    redo: {
      enable: redo,
      run: redo,
    },
    undoInputRule: {
      enable: undoInputRule,
      run: undoInputRule,
    },
  }),
  keys: () => ({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: undoInputRule,
  }),
  plugins: () => ({
    history: historyPlugin(),
  }),
}
