import { MarkSpec } from 'prosemirror-model'

export const underline: MarkSpec = {
  parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
  toDOM: () => ['span', { style: 'text-decoration:underline' }, 0],
}
