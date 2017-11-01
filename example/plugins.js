import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { columnResizing, tableEditing } from 'prosemirror-tables'

import keys from './keys'
import rules from './rules'

export default [
  rules,
  keys,
  dropCursor(),
  gapCursor(),
  history(),
  columnResizing(),
  tableEditing()
]
