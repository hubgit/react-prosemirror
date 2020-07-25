import { baseKeymap } from 'prosemirror-commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'

import { EditorSchema } from '../schema'
import { keys } from './keys'
import { placeholder } from './placeholder'
import { rules } from './rules'

export const plugins: Plugin<EditorSchema>[] = [
  history(), // history
  keys, // custom keymap
  keymap(baseKeymap), // base keymap
  placeholder,
  rules, // input rules
]
