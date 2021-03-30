import { NodeSpec } from 'prosemirror-model'

// adapted from prosemirror-schema-basic

interface Attrs {
  cite?: string
}

export const blockquote: NodeSpec = {
  attrs: {
    cite: { default: null },
  },
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [
    {
      tag: 'blockquote',
      // @ts-ignore
      getAttrs: (element: HTMLElement) => ({
        cite: element.getAttribute('cite'),
      }),
    },
  ],
  toDOM: (node) => {
    const { cite } = node.attrs as Attrs

    return ['blockquote', { cite }, 0]
  },
}
