import { NodeSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const lineBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM: () => ['br'],
}
