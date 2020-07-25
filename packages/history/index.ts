import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'

export const commands = { redo, undo }

export const plugins = [
  history(),
  keymap({
    'Mod-z': commands.undo,
    'Shift-Mod-z': commands.redo,
  }),
]
