import { PomPomMarkSpec } from '@pompom/core'

export const underline: PomPomMarkSpec = {
  parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
  toDOM: () => ['u', 0],
  toXML: () => ['underline', 0],
}
