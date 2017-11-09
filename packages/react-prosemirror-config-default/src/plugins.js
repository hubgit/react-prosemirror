import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { columnResizing, tableEditing } from 'prosemirror-tables'
import { placeholder } from '@aeaton/prosemirror-placeholder'

import 'prosemirror-tables/style/tables.css'
import 'prosemirror-gapcursor/style/gapcursor.css'

import keys from './keys'
import rules from './rules'

export default [
  rules,
  keys,
  placeholder({
    content: 'Start typing…'
  }),
  dropCursor(),
  gapCursor(),
  history(),
  columnResizing(),
  tableEditing()
]

// for tables
document.execCommand('enableObjectResizing', false, false)
document.execCommand('enableInlineTableEditing', false, false)
