import {
  baseKeymap,
  chainCommands,
  exitCode,
  joinDown,
  joinUp,
  lift,
  selectParentNode,
} from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'
import { goToNextCell } from 'prosemirror-tables'

import {
  insertNodeHorizontalRule,
  insertNodeLineBreak,
  liftListItemCommand,
  sinkListItemCommand,
  splitListItemCommand,
  toggleMarkBold,
  toggleMarkCode,
  toggleMarkItalic,
  toggleMarkUnderline,
  wrapInBlockquote,
} from './commands'

export const listKeys = (): Plugin =>
  keymap({
    'Mod-]': sinkListItemCommand,
    'Mod-[': liftListItemCommand,
    Tab: sinkListItemCommand,
    'Shift-Tab': liftListItemCommand,
    Enter: splitListItemCommand,
  })

// TODO: sink/lift headings

export const tableKeys = (): Plugin =>
  keymap({
    Tab: goToNextCell(1),
    'Shift-Tab': goToNextCell(-1),
  })

export const editorKeys = (): Plugin =>
  keymap({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: undoInputRule,
    'Mod-y': redo,
    'Alt-ArrowUp': joinUp,
    'Alt-ArrowDown': joinDown,
    'Mod-BracketLeft': lift,
    Escape: selectParentNode,
    'Meta-b': toggleMarkBold,
    'Meta-i': toggleMarkItalic,
    'Ctrl-`': toggleMarkCode,
    'Mod-u': toggleMarkUnderline,
    'Ctrl->': wrapInBlockquote,
    'Mod-Enter': chainCommands(exitCode, insertNodeLineBreak),
    'Shift-Enter': chainCommands(exitCode, insertNodeLineBreak),
    'Ctrl-Enter': chainCommands(exitCode, insertNodeLineBreak), // mac-only?
    'Mod-_': insertNodeHorizontalRule,
  })

export const baseKeys = (): Plugin => keymap(baseKeymap)
