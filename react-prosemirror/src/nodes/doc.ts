import { NodeSpec } from 'prosemirror-model'

export const doc: NodeSpec = {
  content: 'block+',
  // toDOM: () => ['article', 0],
}
