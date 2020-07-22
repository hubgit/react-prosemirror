import { DOMParser, DOMSerializer, Schema } from 'prosemirror-model'

import { Transformer } from './types'

export const createHtmlTransformer = <S extends Schema>(
  schema: S
): Transformer<S> => {
  const parser = DOMParser.fromSchema<S>(schema)
  const serializer = DOMSerializer.fromSchema<S>(schema)
  // const xmlSerializer = new XMLSerializer()

  return {
    import: (input: string) => {
      const template = document.createElement('template')
      template.innerHTML = input

      return parser.parse(template.content)
    },
    export: (output): string => {
      const fragment = serializer.serializeFragment(output.content)

      // return xmlSerializer.serializeToString(fragment)

      const container = document.createElement('div')
      container.appendChild(fragment)

      return container.innerHTML
    },
  }
}
