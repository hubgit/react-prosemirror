import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'

export interface ProsemirrorTransformer<
  T extends unknown = any,
  S extends Schema = any
> {
  parse: (input: T) => ProsemirrorNode<S>
  serialize: (doc: ProsemirrorNode) => T
}
