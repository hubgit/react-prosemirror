import { MarkSpec } from 'prosemirror-model'

export const underline: MarkSpec = {
  parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
  toDOM: () => ['u', 0],
  toXML: () => ['underline', 0],
}
