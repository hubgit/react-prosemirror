import { toggleMark } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'
import { Schema } from 'prosemirror-model'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'

export const createKeymap = <
  S extends Schema<'listItem' | 'code' | 'bold' | 'italic'>
>(
  schema: S
) => ({
  'Mod-[': liftListItem(schema.nodes.listItem),
  'Shift-Tab': liftListItem(schema.nodes.listItem),
  'Mod-]': sinkListItem(schema.nodes.listItem),
  Tab: sinkListItem(schema.nodes.listItem),
  'Mod-`': toggleMark(schema.marks.code),
  'Mod-b': toggleMark(schema.marks.bold),
  'Mod-i': toggleMark(schema.marks.italic),
  'Mod-z': undo,
  'Shift-Mod-z': redo,
  Backspace: undoInputRule,
  Enter: splitListItem(schema.nodes.listItem),
})
