import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const strikethrough: Extension<never, 'strikethrough'> = {
  marks: {
    strikethrough: {
      parseDOM: [{ tag: 's' }, { style: 'text-decoration=line-through' }],
      toDOM: () => ['s', 0],
      toXML: () => ['strike', 0],
    },
  },
  actions: (schema) => ({
    toggleMarkStrikethrough: {
      label: 'Strikethrough',
      title: 'Toggle strikethrough',
      run: toggleMark(schema.marks.strikethrough),
      enable: toggleMark(schema.marks.strikethrough),
      active: markActive(schema.marks.strikethrough),
    },
  }),
}
