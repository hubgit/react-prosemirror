import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'

import { ProsemirrorTransformer } from './types'

export const createJSONTransformer = (
  schema: Schema
): ProsemirrorTransformer<string> => {
  return {
    parse: (json) => {
      return ProsemirrorNode.fromJSON(schema, JSON.parse(json))
    },

    serialize: (doc) => {
      return JSON.stringify(doc.toJSON(), null, 2)
    },
  }
}
