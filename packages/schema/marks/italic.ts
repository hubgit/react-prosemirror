import { MarkSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const italic: MarkSpec = {
  parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
  toDOM: () => ['i', 0],
}
