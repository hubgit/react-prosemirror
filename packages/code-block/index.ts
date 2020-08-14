import { Extension } from '@pompom/core'
import { setBlockType } from 'prosemirror-commands'
import { textblockTypeInputRule } from 'prosemirror-inputrules'
import { Node } from 'prosemirror-model'

import { CodeBlockView } from './view'

export const codeBlock: Extension<'codeBlock'> = {
  nodes: {
    codeBlock: {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      attrs: {
        language: {
          default: 'javascript',
        },
      },
      parseDOM: [
        {
          tag: 'pre',
          preserveWhitespace: 'full',
          getAttrs: (element: Element) => {
            return {
              language: element.getAttribute('data-language'),
            }
          },
        },
      ],
      toDOM: (node: Node) => [
        'pre',
        {
          'data-language': node.attrs.language,
        },
        ['code', 0],
      ],
    },
  },
  nodeViews: {
    codeBlock: (...props) => new CodeBlockView(...props),
  },
  actions: (schema) => ({
    wrapInCodeBlock: {
      run: setBlockType(schema.nodes.codeBlock), // TODO: unwrap
      enable: setBlockType(schema.nodes.codeBlock),
      // active: blockActive(schema.nodes.codeBlock), // TODO
    },
  }),
  inputRules: (schema) => ({
    codeBlockRule: textblockTypeInputRule(/^```$/, schema.nodes.codeBlock),
  }),
}
