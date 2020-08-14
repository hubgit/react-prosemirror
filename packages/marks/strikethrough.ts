import { PomPomMarkSpec } from '@pompom/core'

export const strikethrough: PomPomMarkSpec = {
  parseDOM: [{ tag: 's' }, { style: 'text-decoration=line-through' }],
  toDOM: () => ['s', 0],
  toXML: () => ['strike', 0],
}
