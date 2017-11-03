import { marks } from 'prosemirror-schema-basic'

const subscript = {
  excludes: 'superscript',
  parseDOM: [
    { tag: 'sub' },
    { style: 'vertical-align=sub' }
  ],
  toDOM: () => ['sub']
}

const superscript = {
  excludes: 'subscript',
  parseDOM: [
    { tag: 'sup' },
    { style: 'vertical-align=super' }
  ],
  toDOM: () => ['sup']
}

export default {
  ...marks,
  subscript,
  superscript
}
