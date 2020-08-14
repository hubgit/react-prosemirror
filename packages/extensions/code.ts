import { Extension } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const code: Extension<never, 'code'> = {
  marks: {
    code: {
      parseDOM: [{ tag: 'code' }, { style: 'font-family=monospace' }],
      toDOM: () => ['code', 0],
    },
  },
  keys: (schema) => ({
    'Mod-`': toggleMark(schema.marks.code),
  }),
}
