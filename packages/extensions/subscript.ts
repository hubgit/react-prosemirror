import { Extension } from '@pompom/core'

export const subscript: Extension<never, 'subscript'> = {
  marks: {
    subscript: {
      parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
      toDOM: () => ['sub', 0],
      toXML: () => ['sub', 0],
    },
  },
}
