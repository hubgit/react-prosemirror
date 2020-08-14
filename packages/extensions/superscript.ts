import { Extension } from '@pompom/core'

export const superscript: Extension<never, 'superscript'> = {
  marks: {
    superscript: {
      parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
      toDOM: () => ['sup', 0],
      toXML: () => ['sup', 0],
    },
  },
}
