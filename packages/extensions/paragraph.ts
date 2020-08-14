import { Extension } from '@pompom/core'

export const paragraph: Extension<'paragraph'> = {
  nodes: {
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },
  },
}
