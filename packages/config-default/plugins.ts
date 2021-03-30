import 'prosemirror-gapcursor/style/gapcursor.css'
import 'prosemirror-tables/style/tables.css'

import { placeholder } from '@aeaton/prosemirror-placeholder'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { history } from 'prosemirror-history'
import { columnResizing, tableEditing } from 'prosemirror-tables'

import { baseKeys, editorKeys, listKeys, tableKeys } from './keys'
import { rules } from './rules'

export const plugins = [
  history(),
  tableKeys(),
  listKeys(),
  editorKeys(),
  baseKeys(), // last
  rules(),
  placeholder(),
  dropCursor(),
  gapCursor(),
  tableEditing(),
  columnResizing({}),
]

document.execCommand('enableObjectResizing', false, 'false')
document.execCommand('enableInlineTableEditing', false, 'false')
