import { MarkSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const code: MarkSpec = {
  parseDOM: [{ tag: 'code' }, { style: 'font-family=monospace' }],
  toDOM: () => ['code', 0],
}
