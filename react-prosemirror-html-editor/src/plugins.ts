import { baseKeymap, joinBackward, toggleMark } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import {
  inputRules,
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'
import { Plugin } from 'prosemirror-state'

import { EditorSchema, schema } from './schema'

export const plugins: Plugin<EditorSchema>[] = [
  // undo/redo
  history(),

  // your custom keymap
  keymap<EditorSchema>({
    'Mod-b': toggleMark<EditorSchema>(schema.marks.strong),
    'Mod-i': toggleMark<EditorSchema>(schema.marks.em),
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: joinBackward, // TODO: select all + delete
    Enter: splitListItem<EditorSchema>(schema.nodes.list_item),
    'Shift-Tab': liftListItem<EditorSchema>(schema.nodes.list_item),
    Tab: sinkListItem<EditorSchema>(schema.nodes.list_item),
  }),

  // the base keymap
  keymap<EditorSchema>(baseKeymap),

  // input rules from prosemirror-example-setup
  inputRules<EditorSchema>({
    rules: [
      // block quote
      wrappingInputRule<EditorSchema>(/^\s*>\s$/, schema.nodes.blockquote),

      // ordered list
      wrappingInputRule<EditorSchema>(
        /^(\d+)\.\s$/,
        schema.nodes.list,
        (matches) => ({
          type: 'ordered',
          order: Number(matches[1]),
        }),
        (matches, node) => {
          return node.childCount + node.attrs.order == Number(matches[1])
        }
      ),

      // unordered list
      wrappingInputRule<EditorSchema>(
        /^\s*([-+*])\s$/,
        schema.nodes.list,
        () => ({
          type: 'unordered',
        })
      ),

      // code block
      textblockTypeInputRule<EditorSchema>(/^```$/, schema.nodes.code_block),

      // headings
      textblockTypeInputRule<EditorSchema>(
        new RegExp('^(#{1,6})\\s$'),
        schema.nodes.heading,
        (matches) => ({ level: matches[1].length })
      ),
    ],
  }),
]
