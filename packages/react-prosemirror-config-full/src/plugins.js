import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { columnResizing, tableEditing } from 'prosemirror-tables'

import keys from './keys'
import rules from './rules'
import schema from './schema'

export default [
  rules(schema),
  keys(schema),
  dropCursor(),
  gapCursor(),
  history(),
  columnResizing(),
  tableEditing()
]
