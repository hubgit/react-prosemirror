import { MarkSpec } from 'prosemirror-model'

export const code: MarkSpec = {
  parseDOM: [{ tag: 'code' }, { style: 'font-family=monospace' }],
  toDOM: () => ['code', 0],
}
