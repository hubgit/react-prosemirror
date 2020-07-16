import { joinBackward, toggleMark } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'
import { Plugin } from 'prosemirror-state'

import { EditorSchema } from '../schema'

export const keys = (schema: EditorSchema): Plugin<EditorSchema> =>
  keymap({
    'Mod-b': toggleMark<EditorSchema>(schema.marks.strong),
    'Mod-i': toggleMark<EditorSchema>(schema.marks.em),
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: joinBackward, // TODO: select all + delete
    Enter: splitListItem<EditorSchema>(schema.nodes.list_item),
    'Shift-Tab': liftListItem<EditorSchema>(schema.nodes.list_item),
    Tab: sinkListItem<EditorSchema>(schema.nodes.list_item),
  })
