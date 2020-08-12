import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const emphasis: Extension<undefined, 'emphasis'> = {
  marks: {
    emphasis: {
      parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style=italic' }],
      toDOM: () => ['em', 0],
      toXML: () => ['italic', 0],
    },
  },
  actions: ({ schema }) => ({
    toggleMarkEmphasis: {
      label: 'Italic',
      title: 'Toggle italic',
      key: 'Mod-i',
      icon: 'italic',
      run: toggleMark(schema.marks.emphasis),
      enable: toggleMark(schema.marks.emphasis),
      active: markActive(schema.marks.emphasis),
    },
  }),
}
