import { Extension } from '@pompom/core'
import { tableEditing } from 'prosemirror-tables'

export const table: Extension<
  'table' | 'tableRow' | 'tableDataCell' | 'tableHeaderCell'
> = {
  nodes: {
    table: {
      group: 'block',
      content: 'tableRow+',
      parseDOM: [{ tag: 'table' }],
      toDOM: () => ['div', { class: 'table-container' }, ['table', 0]],
      toXML: () => ['table-wrap', ['table', 0]],
    },
    tableRow: {
      content: 'tableCell+',
      parseDOM: [{ tag: 'tr' }],
      toDOM: () => ['tr', 0],
    },
    tableDataCell: {
      group: 'tableCell',
      content: 'text*',
      parseDOM: [{ tag: 'td' }],
      toDOM: () => ['td', 0],
    },
    tableHeaderCell: {
      group: 'tableCell',
      content: 'text*',
      parseDOM: [{ tag: 'th' }],
      toDOM: () => ['th', 0],
    },
  },
  plugins: () => ({
    tableEditing: tableEditing(),
  }),
}
