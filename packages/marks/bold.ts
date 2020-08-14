import { PomPomMarkSpec } from '@pompom/core'

export const bold: PomPomMarkSpec = {
  parseDOM: [
    { tag: 'b' },
    { tag: 'strong' },
    { style: 'font-weight=bold' },
    { style: 'font-weight=800' },
  ],
  toDOM: () => ['b', 0],
  toXML: () => ['bold', 0],
}
