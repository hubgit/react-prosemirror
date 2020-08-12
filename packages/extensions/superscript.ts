import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const superscript: Extension<undefined, 'superscript'> = {
  marks: {
    superscript: {
      parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
      toDOM: () => ['sup', 0],
      toXML: () => ['sup', 0],
    },
  },
  actions: ({ schema }) => ({
    toggleMarkSuperscript: {
      label: 'Superscript',
      title: 'Toggle superscript',
      run: toggleMark(schema.marks.superscript),
      enable: toggleMark(schema.marks.superscript),
      active: markActive(schema.marks.superscript),
    },
  }),
}
