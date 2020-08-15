import {
  inputRules,
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules'
import { Schema } from 'prosemirror-model'

export const createInputRules = <
  S extends Schema<
    'heading' | 'codeBlock' | 'blockquote' | 'orderedList' | 'bulletList'
  >
>(
  schema: S
) =>
  inputRules<S>({
    rules: [
      // heading
      textblockTypeInputRule(
        new RegExp('^(#{1,6})\\s$'),
        schema.nodes.heading,
        (match) => ({ level: match[1].length })
      ),

      // code block
      textblockTypeInputRule(/^```$/, schema.nodes.codeBlock),

      // blockquote
      wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),

      // bullet list
      wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bulletList),

      // ordered list
      wrappingInputRule(
        /^(\d+)\.\s$/,
        schema.nodes.orderedList,
        (match) => ({ start: +match[1] }),
        (match, node) => node.childCount + node.attrs.start === +match[1]
      ),
    ],
  })
