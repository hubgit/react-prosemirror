import { MarkSpec } from 'prosemirror-model'

// from prosemirror-schema-basic

export const bold: MarkSpec = {
  parseDOM: [
    {
      tag: 'b',
      // @ts-ignore
      getAttrs: (element: HTMLElement) =>
        element.style.fontWeight != 'normal' && null,
    },
    { tag: 'strong' },
    {
      style: 'font-weight',
      // @ts-ignore
      getAttrs: (style: string) =>
        /^(bold(er)?|[5-9]\d{2,})$/.test(style) && null,
    },
  ],
  toDOM: () => ['b', 0],
}
