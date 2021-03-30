import { NodeSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

interface Attrs {
  src: string
  alt: string | null
  title: string | null
}

export const image: NodeSpec = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
  },
  group: 'inline',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      // @ts-ignore
      getAttrs: (element: HTMLImageElement): Attrs => {
        return {
          src: element.getAttribute('src') as string,
          title: element.getAttribute('title'),
          alt: element.getAttribute('alt'),
        }
      },
    },
  ],
  toDOM(node) {
    const { src, alt, title } = node.attrs as Attrs

    return ['img', { src, alt, title }]
  },
}
