import { MarkType, NodeType, Schema } from 'prosemirror-model'
import {
  blockquote,
  code,
  code_block,
  doc,
  em,
  heading,
  list,
  list_item,
  paragraph,
  strikethrough,
  strong,
  subscript,
  superscript,
  text,
  underline,
} from 'react-prosemirror'

const nodes = {
  doc,
  paragraph,
  text,
  code_block,
  blockquote,
  heading,
  list,
  list_item,
}

const marks = {
  em,
  strong,
  code,
  superscript,
  subscript,
  underline,
  strikethrough,
}

type NodeName = keyof typeof nodes
type MarkName = keyof typeof marks

export interface EditorSchema extends Schema {
  nodes: Record<NodeName, NodeType>
  marks: Record<MarkName, MarkType>
}

export const createSchema = (): EditorSchema =>
  new Schema({
    nodes,
    marks,
  })
