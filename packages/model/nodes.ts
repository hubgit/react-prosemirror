import { NodeSpec } from 'prosemirror-model'

export const doc: NodeSpec = {
  content: '(block | heading)+',
  toDOM: () => ['article', 0],
}

export const text: NodeSpec = {
  group: 'inline',
}

export const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM: () => ['p', 0],
}

export const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM: () => ['blockquote', 0],
}

export const heading: NodeSpec = {
  attrs: { level: { default: 1 } },
  content: 'inline*',
  marks: 'em superscript subscript',
  group: 'heading',
  defining: true,
  parseDOM: [
    { tag: 'h1', attrs: { level: 1 } },
    { tag: 'h2', attrs: { level: 2 } },
    { tag: 'h3', attrs: { level: 3 } },
    { tag: 'h4', attrs: { level: 4 } },
    { tag: 'h5', attrs: { level: 5 } },
    { tag: 'h6', attrs: { level: 6 } },
  ],
  toDOM: (node) => ['h' + node.attrs.level, 0],
}

interface ListAttrs {
  start?: number
  type: string
}

export const list: NodeSpec = {
  attrs: {
    start: { default: 1 },
    type: { default: 'unordered' },
  },
  content: 'listItem+',
  group: 'block',
  parseDOM: [
    {
      tag: 'ol',
      getAttrs: (dom: Node | string): ListAttrs => {
        const element = dom as HTMLOListElement

        const start = element.getAttribute('start')

        return {
          type: 'ordered',
          start: start === undefined ? 1 : Number(start),
        }
      },
    },
    {
      tag: 'ul',
      getAttrs: (): ListAttrs => {
        return {
          type: 'unordered',
        }
      },
    },
  ],
  toDOM: (node) => {
    switch (node.attrs.type) {
      case 'ordered': {
        return node.attrs.order == 1
          ? ['ol', 0]
          : ['ol', { start: node.attrs.order }, 0]
      }

      case 'unordered':
      default: {
        return ['ul', 0]
      }
    }
  },
}

export const listItem: NodeSpec = {
  content: 'paragraph (paragraph | list)*',
  defining: true,
  parseDOM: [{ tag: 'li' }],
  toDOM: () => ['li', 0],
}
