import { NodeSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const horizontalRule: NodeSpec = {
  group: 'block',
  parseDOM: [{ tag: 'hr' }],
  toDOM: () => ['hr'],
}
