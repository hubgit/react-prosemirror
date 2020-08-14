import { PomPomMarkSpec } from '@pompom/core'

export const code: PomPomMarkSpec = {
  parseDOM: [{ tag: 'code' }, { style: 'font-family=monospace' }],
  toDOM: () => ['code', 0],
}
