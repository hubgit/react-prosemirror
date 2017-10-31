import { history } from 'prosemirror-history'
import { Plugin } from 'prosemirror-state'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'

import menu from './menu'
import keys from './keys'
import rules from './rules'

export default [
  rules,
  keys,
  menu,
  dropCursor(),
  gapCursor(),
  history(),
  new Plugin({
    props: {
      attributes: { class: 'prosemirror-editor' }
    }
  })
]
