import { PomPomNodeSpec } from '@pompom/core'
import { Node } from 'prosemirror-model'

export const codeBlock: PomPomNodeSpec = {
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
      getAttrs: (element: Element) => ({
        language: element.getAttribute('data-language') || undefined,
      }),
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
