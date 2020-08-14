import { Extension } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const strong: Extension<any, 'strong'> = {
  marks: {
    strong: {
      parseDOM: [
        { tag: 'strong' },
        { tag: 'b' },
        { style: 'font-weight=bold' },
        { style: 'font-weight=800' },
      ],
      toDOM: () => ['strong', 0],
      toXML: () => ['bold', 0],
    },
  },
  keys: (schema) => ({
    'Mod-b': toggleMark(schema.marks.strong),
  }),
}
