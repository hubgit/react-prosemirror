import { Extension } from '@pompom/core'
import { Node } from 'prosemirror-model'

export const image: Extension<'image'> = {
  nodes: {
    image: {
      group: 'inline',
      inline: true,
      attrs: {
        src: { default: '' },
      },
      parseDOM: [
        {
          tag: 'img',
          getAttrs: (element: Element) => ({
            src: element.getAttribute('src'),
          }),
        },
      ],
      toDOM: (node: Node) => ['img', node.attrs],
      toXML: (node: Node) => ['graphic', { 'xlink:href': node.attrs.src }],
    },
  },
}
