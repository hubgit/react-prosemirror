import { Extension } from '@pompom/core'

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
      toDOM: (node) => ['img', node.attrs],
      toXML: (node) => ['graphic', { 'xlink:href': node.attrs.src }],
    },
  },
}
