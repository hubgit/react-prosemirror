import { NodeSpec } from 'prosemirror-model'

// changed from prosemirror-schema-list

interface Attrs {
  type: string
  start?: number
}

export const list: NodeSpec = {
  attrs: {
    type: { default: 'ordered' }, // 'ordered', 'bullet', 'simple'
    start: { default: 1 }, // for ordered lists
  },
  group: 'block list',
  content: 'listItem+',
  parseDOM: [
    {
      tag: 'ol',
      // @ts-ignore
      getAttrs: (element: HTMLOListElement): Attrs => {
        const start = element.getAttribute('start')

        return {
          type: 'ordered',
          start: start === null ? 1 : Number(start),
        }
      },
    },
    { tag: 'ul.simple', getAttrs: () => ({ type: 'simple' }) },
    { tag: 'ul', getAttrs: () => ({ type: 'bullet' }) },
  ],
  toDOM: (node) => {
    const { type, start } = node.attrs as Attrs

    switch (type) {
      case 'ordered':
        return ['ol', { start: start === 1 ? undefined : String(start) }, 0]

      case 'simple':
        return ['ul', { class: 'simple' }, 0]

      case 'bullet':
      default:
        return ['ul', 0]
    }
  },
}

export const listItem: NodeSpec = {
  content: 'paragraph block*', // 'block+',
  defining: true,
  parseDOM: [{ tag: 'li' }],
  toDOM: () => ['li', 0],
}
