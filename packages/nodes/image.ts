import { PomPomNodeSpec } from '@pompom/core'

export const image: PomPomNodeSpec = {
  group: 'inline',
  inline: true,
  attrs: {
    src: { default: undefined },
  },
  parseDOM: [
    {
      tag: 'img',
      getAttrs: (element: Element) => ({
        src: element.getAttribute('src') || undefined,
      }),
    },
  ],
  toDOM: (node) => ['img', node.attrs],
  toXML: (node) => ['graphic', { 'xlink:href': node.attrs.src }],
}
