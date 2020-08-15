import { NodeSpec } from 'prosemirror-model'

export const tableHeaderCell: NodeSpec = {
  group: 'tableCell',
  content: 'block+',
  parseDOM: [{ tag: 'th' }],
  toDOM: () => ['th', 0],
}

export const tableDataCell: NodeSpec = {
  group: 'tableCell',
  content: 'block+',
  parseDOM: [{ tag: 'td' }],
  toDOM: () => ['td', 0],
}

export const tableRow: NodeSpec = {
  content: 'tableCell+',
  parseDOM: [{ tag: 'tr' }],
  toDOM: () => ['tr', 0],
}

export const table: NodeSpec = {
  group: 'block',
  content: 'tableRow+',
  parseDOM: [{ tag: 'table' }],
  toDOM: () => ['div', { class: 'table-container' }, ['table', 0]],
  toXML: () => ['table-wrap', ['table', 0]],
}

// TODO: caption
