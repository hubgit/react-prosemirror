import { Extension } from '@pompom/core'

export const strikethrough: Extension<never, 'strikethrough'> = {
  marks: {
    strikethrough: {
      parseDOM: [{ tag: 's' }, { style: 'text-decoration=line-through' }],
      toDOM: () => ['s', 0],
      toXML: () => ['strike', 0],
    },
  },
}
