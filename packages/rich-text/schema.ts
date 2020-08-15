import { PomPomMarkSpec, PomPomNodeSpec } from '@pompom/core'
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

const marks: Record<string, PomPomMarkSpec> = {
  bold,
  code,
  italic,
  strikethrough,
  subscript,
  superscript,
  underline,
}

const nodes: Record<string, PomPomNodeSpec> = {
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
}

type Marks = keyof typeof marks
type Nodes = keyof typeof nodes
export type EditorSchema = Schema<Marks, Nodes>

export const schema: EditorSchema = new Schema<Marks, Nodes>({
  marks: marks as Record<string, MarkSpec>,
  nodes: nodes as Record<string, NodeSpec>,
})
