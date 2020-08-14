import { PomPomMarkSpec } from '@pompom/core'

export const italic: PomPomMarkSpec = {
  parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
  toDOM: () => ['i', 0],
  toXML: () => ['italic', 0],
}
