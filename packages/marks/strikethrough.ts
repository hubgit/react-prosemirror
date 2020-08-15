import { MarkSpec } from 'prosemirror-model'

export const strikethrough: MarkSpec = {
  parseDOM: [
    { tag: 's' },
    { style: 'text-decoration=line-through' },
    { style: 'text-decoration-line=line-through' },
  ],
  toDOM: () => ['s', 0],
  toXML: () => ['strike', 0],
}
