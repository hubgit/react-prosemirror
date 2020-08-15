import { MarkSpec } from 'prosemirror-model'

export const subscript: MarkSpec = {
  excludes: 'superscript',
  parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
  toDOM: () => ['sub', 0],
  toXML: () => ['sub', 0],
}
