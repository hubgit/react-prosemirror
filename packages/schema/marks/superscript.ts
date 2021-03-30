import { MarkSpec } from 'prosemirror-model'

export const superscript: MarkSpec = {
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: () => ['sup', 0],
  excludes: 'subscript',
}
