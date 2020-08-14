import { PomPomNodeSpec } from '@pompom/core'

export const blockquote: PomPomNodeSpec = {
  attrs: {
    cite: { default: undefined },
  },
  group: 'block',
  content: 'block+',
  parseDOM: [
    {
      tag: 'blockquote',
      getAttrs: (element: Element) => ({
        cite: element.getAttribute('cite') || undefined,
      }),
    },
  ],
  toDOM: () => ['blockquote', 0],
  toXML: () => ['disp-quote', 0],
}
