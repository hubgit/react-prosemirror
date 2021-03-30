import { NodeSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const heading: NodeSpec = {
  attrs: {
    level: { default: 1 },
  },
  group: 'block heading',
  content: 'inline*',
  marks: 'italic superscript subscript',
  defining: true,
  parseDOM: [
    { tag: 'h1', attrs: { level: 1 } },
    { tag: 'h2', attrs: { level: 2 } },
    { tag: 'h3', attrs: { level: 3 } },
    { tag: 'h4', attrs: { level: 4 } },
    { tag: 'h5', attrs: { level: 5 } },
    { tag: 'h6', attrs: { level: 6 } },
  ],
  toDOM: (node) => [`h${String(node.attrs.level)}`, 0],
}
