import { PomPomNodeSpec } from '@pompom/core'

export const listItem: PomPomNodeSpec = {
  content: '(paragraph | list)+', // 'paragraph (paragraph | list)+'
  parseDOM: [{ tag: 'li' }],
  toDOM: () => ['li', 0],
  toXML: () => ['list-item', 0],
}

export const orderedList: PomPomNodeSpec = {
  attrs: {
    start: { default: 1 },
  },
  group: 'block list',
  content: 'listItem+',
  parseDOM: [
    {
      tag: 'ol',
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

export const bulletList: PomPomNodeSpec = {
  group: 'block list',
  content: 'listItem+',
  parseDOM: [{ tag: 'ul' }],
  toDOM: () => ['ul', 0],
  toXML: () => ['list', { 'list-type': 'bullet' }, 0],
}
