import { toggleMark } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'

import { schema } from './schema'

export const keys = {
  'Mod-[': liftListItem(schema.nodes.listItem),
  'Mod-]': sinkListItem(schema.nodes.listItem), // Tab
  'Mod-`': toggleMark(schema.marks.code),
  'Mod-b': toggleMark(schema.marks.bold),
  'Mod-i': toggleMark(schema.marks.italic),
  'Mod-z': undo,
  'Shift-Mod-z': redo,
  Backspace: undoInputRule,
  Enter: splitListItem(schema.nodes.listItem),
}
