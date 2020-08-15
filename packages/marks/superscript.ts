import { MarkSpec } from 'prosemirror-model'

export const superscript: MarkSpec = {
  excludes: 'subscript',
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: () => ['sup', 0],
  toXML: () => ['sup', 0],
}
