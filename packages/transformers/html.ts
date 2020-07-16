import { DOMParser, DOMSerializer, Schema } from 'prosemirror-model'

import { Transformer } from './types'

export const createHtmlTransformer = <S extends Schema>(
  schema: S
): Transformer<S> => {
  const parser = DOMParser.fromSchema<S>(schema)
  const serializer = DOMSerializer.fromSchema<S>(schema)

  return {
    import: (input: string) => {
      const template = document.createElement('template')
      template.innerHTML = input

      return parser.parse(template.content)
    },
    export: (output): string => {
      const template = document.createElement('template')
      template.appendChild(serializer.serializeFragment(output.content))

      return template.firstElementChild?.outerHTML || ''
    },
  }
}
