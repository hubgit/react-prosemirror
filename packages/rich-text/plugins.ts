import { placeholder } from '@pompom/plugins'
import { baseKeymap } from 'prosemirror-commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'
import { tableEditing } from 'prosemirror-tables'

import { inputRules } from './input-rules'
import { keys } from './keys'

export const plugins: Plugin[] = [
  keymap(keys),
  keymap(baseKeymap),
  inputRules,
  history(),
  tableEditing(),
  placeholder,
]
