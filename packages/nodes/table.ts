import { PomPomNodeSpec } from '@pompom/core'

export const tableHeaderCell: PomPomNodeSpec = {
  group: 'tableCell',
  content: 'text*',
  parseDOM: [{ tag: 'th' }],
  toDOM: () => ['th', 0],
}

export const tableDataCell: PomPomNodeSpec = {
  group: 'tableCell',
  content: 'text*',
  parseDOM: [{ tag: 'td' }],
  toDOM: () => ['td', 0],
}

export const tableRow: PomPomNodeSpec = {
  content: 'tableCell+',
  parseDOM: [{ tag: 'tr' }],
  toDOM: () => ['tr', 0],
}

export const table: PomPomNodeSpec = {
  group: 'block',
  content: 'tableRow+',
  parseDOM: [{ tag: 'table' }],
  toDOM: () => ['div', { class: 'table-container' }, ['table', 0]],
  toXML: () => ['table-wrap', ['table', 0]],
}

// TODO: caption
