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
      default: 'javascript', // TODO: auto-detect
    },
  },
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
      getAttrs: (element: Element) => ({
        language: element.getAttribute('data-language'),
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
