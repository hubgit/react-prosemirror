import { backspaceInList } from '@pompom/commands'
import { redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { splitListItem } from 'prosemirror-schema-list'
import { Plugin } from 'prosemirror-state'

import {
  indentListItem,
  outdentListItem,
  toggleEmphasis,
  toggleStrong,
} from '../actions'
import { EditorSchema, schema } from '../schema'

export const keys: Plugin<EditorSchema> = keymap({
  // marks
  'Mod-b': toggleStrong.run,
  'Mod-i': toggleEmphasis.run,

  // lists
  Enter: splitListItem<EditorSchema>(schema.nodes.list_item),
  Backspace: backspaceInList<EditorSchema>(schema.nodes.list_item),
  'Shift-Tab': outdentListItem.run,
  Tab: indentListItem.run,

  // history
  'Mod-z': undo,
  'Shift-Mod-z': redo,
})
