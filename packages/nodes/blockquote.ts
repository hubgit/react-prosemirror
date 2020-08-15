import { NodeSpec } from 'prosemirror-model'

export const blockquote: NodeSpec = {
  attrs: {
    cite: { default: undefined },
  },
  group: 'block',
  content: 'block+',
  parseDOM: [
    {
      tag: 'blockquote',
      // @ts-ignore
      getAttrs: (element: HTMLElement) => {
        return {
          cite: element.getAttribute('cite') || undefined,
        }
      },
    },
  ],
  toDOM: () => ['blockquote', 0],
  toXML: () => ['disp-quote', 0],
}
