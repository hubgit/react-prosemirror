import { NodeSpec } from 'prosemirror-model'

export const listItem: NodeSpec = {
  content: '(paragraph | list)+', // 'paragraph (paragraph | list)+'
  parseDOM: [{ tag: 'li' }],
  toDOM: () => ['li', 0],
  toXML: () => ['list-item', 0],
}

export const orderedList: NodeSpec = {
  attrs: {
    start: { default: 1 },
  },
  group: 'block list',
  content: 'listItem+',
  parseDOM: [
    {
      tag: 'ol',
      // @ts-ignore
      getAttrs: (element: Element) => {
        const start = element.getAttribute('start')

        return {
          start: start !== undefined ? Number(start) : 1,
        }
      },
    },
  ],
  toDOM: () => ['ol', 0],
  toXML: () => ['list', { 'list-type': 'order' }, 0],
}

export const bulletList: NodeSpec = {
  group: 'block list',
  content: 'listItem+',
  parseDOM: [{ tag: 'ul' }],
  toDOM: () => ['ul', 0],
  toXML: () => ['list', { 'list-type': 'bullet' }, 0],
}
