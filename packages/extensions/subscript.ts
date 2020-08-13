import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const subscript: Extension<never, 'subscript'> = {
  marks: {
    subscript: {
      parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
      toDOM: () => ['sub', 0],
      toXML: () => ['sub', 0],
    },
  },
  actions: (schema) => ({
    toggleMarkSubscript: {
      label: 'subscript',
      title: 'Toggle subscript',
      run: toggleMark(schema.marks.subscript),
      enable: toggleMark(schema.marks.subscript),
      active: markActive(schema.marks.subscript),
    },
  }),
}
