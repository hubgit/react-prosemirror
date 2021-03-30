import { MarkSpec } from 'prosemirror-model'

export const subscript: MarkSpec = {
  parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
  toDOM: () => ['sub', 0],
  excludes: 'superscript',
}
