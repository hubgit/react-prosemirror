import { PomPomNodeSpec } from '@pompom/core'

export const paragraph: PomPomNodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM: () => ['p', 0],
}
