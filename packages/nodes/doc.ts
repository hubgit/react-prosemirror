import { PomPomNodeSpec } from '@pompom/core'

export const doc: PomPomNodeSpec = {
  content: 'block+',
  toDOM: () => ['article', 0],
}
