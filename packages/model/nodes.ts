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

export const code_block: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  attrs: {
    language: {
      default: 'javascript',
    },
  },
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
      // @ts-ignore
      getAttrs: (node: HTMLPreElement) => {
        return {
          language: node.getAttribute('data-language'),
        }
      },
    },
  ],
  toDOM: (node) => [
    'pre',
    {
      'data-language': node.attrs.language,
    },
    ['code', 0],
  ],
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
