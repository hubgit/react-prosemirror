import { NodeSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const codeBlock: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
  toDOM: () => ['pre', ['code', 0]],
}
