import MarkdownIt from 'markdown-it'
import {
  MarkdownParser,
  MarkdownSerializer,
  MarkdownSerializerState,
  MarkSerializerConfig,
  TokenConfig,
} from 'prosemirror-markdown'
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'

import { ProsemirrorTransformer } from './types'

type NodeSerializer<S extends Schema = any> = (
  state: MarkdownSerializerState<S>,
  node: ProsemirrorNode<S>,
  parent: ProsemirrorNode<S>,
  index: number
) => void

export const createMarkdownTransformer = <S extends Schema>(
  schema: S,
  nodes: Record<string, NodeSerializer>,
  marks: Record<string, MarkSerializerConfig>,
  tokens: Record<string, TokenConfig>,
  options: Record<string, unknown>
): ProsemirrorTransformer<string, S> => {
  const tokenizer = new MarkdownIt()
  const parser = new MarkdownParser(schema, tokenizer, tokens)
  const serializer = new MarkdownSerializer<S>(nodes, marks)

  return {
    parse: (markdown) => {
      return parser.parse(markdown)
    },

    serialize: (doc) => {
      return serializer.serialize(doc, options)
    },
  }
}
