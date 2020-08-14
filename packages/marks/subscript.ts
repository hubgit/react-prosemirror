import { PomPomMarkSpec } from '@pompom/core'

export const subscript: PomPomMarkSpec = {
  parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
  toDOM: () => ['sub', 0],
  toXML: () => ['sub', 0],
}
