import { Extension, markActive } from '@pompom/core'
import { toggleMark } from 'prosemirror-commands'

export const code: Extension<undefined, 'code'> = {
  marks: {
    code: {
      parseDOM: [{ tag: 'code' }, { style: 'font-family=monospace' }],
      toDOM: () => ['code', 0],
    },
  },
  actions: ({ schema }) => ({
    toggleMarkCode: {
      key: 'Mod-`',
      icon: 'code',
      label: 'Code',
      title: 'Toggle code',
      run: toggleMark(schema.marks.code),
      enable: toggleMark(schema.marks.code),
      active: markActive(schema.marks.code),
    },
  }),
}
