import { DOMParser, DOMSerializer, Schema } from 'prosemirror-model'

import { ProsemirrorTransformer } from './types'

export const createHTMLTransformer = <S extends Schema>(
  schema: S
): ProsemirrorTransformer<string, S> => {
  const parser = DOMParser.fromSchema(schema)
  const serializer = DOMSerializer.fromSchema(schema)

  return {
    parse: (html) => {
      const template = document.createElement('template')

      template.innerHTML = html.trim()

      if (!template.content?.firstChild) {
        throw new Error('Error parsing HTML input')
      }

      return parser.parse(template.content)
    },

    serialize: (doc) => {
      const template = document.createElement('template')

      template.content.appendChild(serializer.serializeFragment(doc.content))

      return template.innerHTML
    },
  }
}
