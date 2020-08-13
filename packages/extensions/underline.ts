import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const underline: Extension<never, 'underline'> = {
  marks: {
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM: () => ['u', 0],
      toXML: () => ['u', 0],
    },
  },
  actions: (schema) => ({
    toggleMarkUnderline: {
      label: 'underline',
      title: 'Toggle underline',
      key: 'Mod-u',
      run: toggleMark(schema.marks.underline),
      enable: toggleMark(schema.marks.underline),
      active: markActive(schema.marks.underline),
    },
  }),
}
