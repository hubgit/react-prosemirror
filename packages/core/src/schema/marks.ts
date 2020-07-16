import { MarkSpec } from 'prosemirror-model'

export const em: MarkSpec = {
  parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style=italic' }],
  toDOM: () => ['em', 0],
}

export const strong: MarkSpec = {
  parseDOM: [{ tag: 'strong' }, { tag: 'b' }, { style: 'font-weight=bold' }],
  toDOM: () => ['strong', 0],
}

export const code: MarkSpec = {
  parseDOM: [{ tag: 'code' }, { style: 'font-family=monospace' }],
  toDOM: () => ['code', 0],
}

export const superscript: MarkSpec = {
  excludes: 'subscript',
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: () => ['sup', 0],
}

export const subscript: MarkSpec = {
  excludes: 'superscript',
  parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
  toDOM: () => ['sub', 0],
}

export const underline: MarkSpec = {
  parseDOM: [{ tag: 'u' }, { style: 'text-decoration: underline' }],
  toDOM: () => ['u', 0],
}

export const strikethrough: MarkSpec = {
  parseDOM: [{ tag: 's' }, { style: 'text-decoration: line-through' }],
  toDOM: () => ['s', 0],
}
