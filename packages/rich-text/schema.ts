import {
  bold,
  code,
  italic,
  strikethrough,
  subscript,
  superscript,
  underline,
} from '@pompom/marks'
import {
  blockquote,
  bulletList,
  codeBlock,
  doc,
  heading,
  image,
  listItem,
  orderedList,
  paragraph,
  table,
  tableDataCell,
  tableHeaderCell,
  tableRow,
  text,
} from '@pompom/nodes'
import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model'

export const schema = new Schema({
  marks: {
    bold,
    code,
    italic,
    strikethrough,
    subscript,
    superscript,
    underline,
  } as Record<string, MarkSpec>,
  nodes: {
    text,
    doc,
    paragraph,
    heading,
    blockquote,
    codeBlock,
    image,
    bulletList,
    orderedList,
    listItem,
    table,
    tableRow,
    tableDataCell,
    tableHeaderCell,
  } as Record<string, NodeSpec>,
})
