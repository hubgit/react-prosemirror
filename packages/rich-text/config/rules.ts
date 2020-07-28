// input rules from prosemirror-example-setup
import {
  inputRules,
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules'

import { EditorSchema, schema } from './schema'

export const rules = inputRules({
  rules: [
    // wrap in block quote
    wrappingInputRule<EditorSchema>(/^\s*>\s$/, schema.nodes.blockquote),

    // wrap in ordered list
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

    // wrap in unordered list
    wrappingInputRule<EditorSchema>(
      /^\s*([-+*])\s$/,
      schema.nodes.list,
      () => ({
        type: 'unordered',
      })
    ),

    // set as code block
    // textblockTypeInputRule<EditorSchema>(/^```$/, schema.nodes.codeBlock),

    // set as heading
    textblockTypeInputRule<EditorSchema>(
      new RegExp('^(#{1,6})\\s$'),
      schema.nodes.heading,
      (matches) => ({ level: matches[1].length })
    ),
  ],
})
