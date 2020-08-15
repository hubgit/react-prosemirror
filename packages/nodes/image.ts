import { Node, NodeSpec } from 'prosemirror-model'

export const image: NodeSpec = {
  group: 'inline',
  inline: true,
  attrs: {
    src: { default: undefined },
  },
  parseDOM: [
    {
      tag: 'img',
      // @ts-ignore
      getAttrs: (element: HTMLImageElement) => {
        return {
          src: element.getAttribute('src') || undefined,
        }
      },
    },
  ],
  toDOM: (node: Node) => ['img', node.attrs],
  toXML: (node: Node) => ['graphic', { 'xlink:href': node.attrs.src }],
}
