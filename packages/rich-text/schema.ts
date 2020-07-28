// import { codeBlock } from '@pompom/code-block'
import {
  blockquote,
  code,
  doc,
  em,
  heading,
  list,
  listItem,
  paragraph,
  strikethrough,
  strong,
  subscript,
  superscript,
  text,
  underline,
} from '@pompom/model'
import { MarkType, NodeType, Schema } from 'prosemirror-model'

const nodes = {
  doc,
  paragraph,
  text,
  // codeBlock,
  blockquote,
  heading,
  list,
  listItem,
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

export const schema: EditorSchema = new Schema({
  nodes,
  marks,
})
