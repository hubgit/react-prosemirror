import { PomPomMarkSpec } from '@pompom/core'

export const superscript: PomPomMarkSpec = {
  excludes: 'subscript',
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: () => ['sup', 0],
  toXML: () => ['sup', 0],
}
