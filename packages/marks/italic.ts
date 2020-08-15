import { MarkSpec } from 'prosemirror-model'

export const italic: MarkSpec = {
  parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
  toDOM: () => ['i', 0],
  toXML: () => ['italic', 0],
}
