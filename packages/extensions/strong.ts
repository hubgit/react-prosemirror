import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const strong: Extension<undefined, 'strong'> = {
  marks: {
    strong: {
      parseDOM: [
        { tag: 'strong' },
        { tag: 'b' },
        { style: 'font-weight=bold' },
        { style: 'font-weight=800' },
      ],
      toDOM: () => ['strong', 0],
      toXML: () => ['bold', 0],
    },
  },
  actions: ({ schema }) => ({
    toggleMarkStrong: {
      label: 'Bold',
      title: 'Toggle bold',
      key: 'Mod-b',
      icon: 'bold',
      run: toggleMark(schema.marks.strong),
      enable: toggleMark(schema.marks.strong),
      active: markActive(schema.marks.strong),
    },
  }),
}
