import { MarkSpec } from 'prosemirror-model'

export const strikethrough: MarkSpec = {
  parseDOM: [
    { tag: 'strike' },
    { style: 'text-decoration=line-through' },
    { style: 'text-decoration-line=line-through' },
  ],
  toDOM: () => ['span', { style: 'text-decoration-line:line-through' }],
}
