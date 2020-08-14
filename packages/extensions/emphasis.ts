import { Extension } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const emphasis: Extension<never, 'emphasis'> = {
  marks: {
    emphasis: {
      parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style=italic' }],
      toDOM: () => ['em', 0],
      toXML: () => ['italic', 0],
    },
  },
  keys: (schema) => ({
    'Mod-i': toggleMark(schema.marks.emphasis),
  }),
}
