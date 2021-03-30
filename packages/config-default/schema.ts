import {
  blockquote,
  bold,
  code,
  codeBlock,
  doc,
  heading,
  horizontalRule,
  italic,
  lineBreak,
  link,
  list,
  listItem,
  paragraph,
  strikethrough,
  subscript,
  superscript,
  table,
  tableDataCell,
  tableHeaderCell,
  tableRow,
  text,
  underline,
} from '@aeaton/prosemirror-schema'
import { Schema } from 'prosemirror-model'

export const schema = new Schema({
  marks: {
    bold,
    code,
    italic,
    link,
    strikethrough,
    subscript,
    superscript,
    underline,
  },
  nodes: {
    text, // plain text node
    doc, // top-level node
    paragraph, // paragraph must be the first node type of the "block" group
    lineBreak,
    heading,
    blockquote,
    codeBlock,
    horizontalRule,
    list,
    listItem,
    table,
    tableRow,
    tableDataCell, // tableDataCell must be the first node type of the "tableCell" group
    tableHeaderCell,
  },
})
