import { Node, NodeSpec } from 'prosemirror-model'

export const codeBlock: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  attrs: {
    language: {
      default: undefined,
    },
  },
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
      // @ts-ignore
      getAttrs: (element: HTMLPreElement) => {
        return {
          language: element.getAttribute('data-language') || undefined,
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
}
