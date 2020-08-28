import { NodeSpec, NodeType } from 'prosemirror-model'

export const heading: NodeSpec = {
  attrs: {
    level: { default: 1 },
  },
  group: 'block heading',
  content: 'text*',
  marks: 'italic superscript subscript',
  defining: true,
  parseDOM: [
    { tag: 'h1', getAttrs: () => ({ level: 1 }) },
    { tag: 'h2', getAttrs: () => ({ level: 2 }) },
    { tag: 'h3', getAttrs: () => ({ level: 3 }) },
    { tag: 'h4', getAttrs: () => ({ level: 4 }) },
    { tag: 'h5', getAttrs: () => ({ level: 5 }) },
    { tag: 'h6', getAttrs: () => ({ level: 6 }) },
  ],
  toDOM: (node) => ['h' + node.attrs.level, 0],
  toXML: () => ['title', 0], // TODO: wrap in section
}

export const sinkHeading = (headingType: NodeType) => {
  // TODO
}

export const liftHeading = (headingType: NodeType) => {
  // TODO
}
