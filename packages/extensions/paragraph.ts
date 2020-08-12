import { blockActive, Extension } from '@pompom/core'
import { setBlockType } from 'prosemirror-commands'

export const paragraph: Extension<'paragraph'> = {
  nodes: {
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },
  },
  actions: ({ schema }) => ({
    setNodeTypeParagraph: {
      label: 'Paragraph',
      title: 'Change to paragraph',
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph),
    },
  }),
}
