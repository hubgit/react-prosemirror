import { NodeSpec } from 'prosemirror-model'

// from prosemirror-tables

export const table: NodeSpec = {
  group: 'block',
  content: 'tableRow+',
  tableRole: 'table',
  parseDOM: [{ tag: 'table' }],
  toDOM: () => ['div', { class: 'table-wrap' }, ['table', 0]],
}

export const tableRow: NodeSpec = {
  content: 'tableCell+',
  tableRole: 'row',
  parseDOM: [{ tag: 'tr' }],
  toDOM: () => ['tr', 0],
}

export const tableDataCell: NodeSpec = {
  attrs: {
    colspan: { default: 1 },
    rowspan: { default: 1 },
    colwidth: { default: null },
  },
  group: 'tableCell',
  content: 'block+',
  tableRole: 'cell',
  parseDOM: [{ tag: 'td' }],
  toDOM: () => ['td', 0],
}

export const tableHeaderCell: NodeSpec = {
  attrs: {
    colspan: { default: 1 },
    rowspan: { default: 1 },
    colwidth: { default: null },
  },
  group: 'tableCell',
  content: 'block+',
  tableRole: 'header_cell',
  parseDOM: [{ tag: 'th' }],
  toDOM: () => ['th', 0],
}
