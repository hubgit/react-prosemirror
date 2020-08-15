import { placeholder } from '@pompom/plugins'
import { baseKeymap } from 'prosemirror-commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { tableEditing } from 'prosemirror-tables'

import { createInputRules } from './input-rules'
import { createKeymap } from './keys'

export const createPlugins = <S extends Schema>(schema: S): Plugin<S>[] => [
  keymap(createKeymap(schema)),
  keymap(baseKeymap),
  createInputRules<S>(schema),
  history(),
  tableEditing(),
  placeholder(),
]
