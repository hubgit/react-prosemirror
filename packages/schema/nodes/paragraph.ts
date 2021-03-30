import { NodeSpec } from 'prosemirror-model'

export const paragraph: NodeSpec = {
  group: 'block',
  content: 'inline*',
  parseDOM: [{ tag: 'p' }],
  toDOM: () => ['p', 0],
}
