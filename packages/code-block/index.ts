import { Extension } from '@pompom/core'
import { wrapIn } from 'prosemirror-commands'
import { textblockTypeInputRule } from 'prosemirror-inputrules'

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
          // @ts-ignore
          getAttrs: (node: HTMLPreElement) => {
            return {
              language: node.getAttribute('data-language'),
            }
          },
        },
      ],
      toDOM: (node) => [
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
  actions: ({ schema }) => ({
    wrapInCodeBlock: {
      icon: 'code',
      label: 'Code Block',
      title: 'Toggle Code Block',
      run: wrapIn(schema.nodes.codeBlock), // TODO: unwrap
      enable: wrapIn(schema.nodes.codeBlock),
      // active: blockActive(schema.nodes.codeBlock), // TODO
    },
  }),
  inputRules: ({ schema }) => ({
    codeBlockRule: textblockTypeInputRule(/^```$/, schema.nodes.codeBlock),
  }),
}
