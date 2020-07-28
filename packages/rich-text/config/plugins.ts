import { baseKeymap } from 'prosemirror-commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'

import { placeholder } from '../plugins/placeholder'
import { keys } from './keys'
import { rules } from './rules'
import { EditorSchema } from './schema'

export const plugins: Plugin<EditorSchema>[] = [
  history(), // history
  keys, // custom keymap
  keymap(baseKeymap), // base keymap
  placeholder,
  rules, // input rules
]
