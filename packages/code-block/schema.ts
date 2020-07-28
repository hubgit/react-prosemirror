import { NodeSpec } from 'prosemirror-model'

export const codeBlock: NodeSpec = {
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
}
