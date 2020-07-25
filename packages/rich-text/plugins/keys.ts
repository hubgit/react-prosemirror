import { toggleMark } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { EditorState, Plugin, Transaction } from 'prosemirror-state'

import { EditorSchema, schema } from '../schema'

export const keys: Plugin<EditorSchema> = keymap({
  'Mod-b': toggleMark<EditorSchema>(schema.marks.strong),
  'Mod-i': toggleMark<EditorSchema>(schema.marks.em),
})
