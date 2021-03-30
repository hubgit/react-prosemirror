import { NodeSpec } from 'prosemirror-model'

export const footnote: NodeSpec = {
  group: 'inline',
  content: 'inline*',
  inline: true,
  draggable: true,
  atom: true,
  toDOM: () => ['prosemirror-footnote', 0],
  parseDOM: [{ tag: 'prosemirror-footnote' }],
}
