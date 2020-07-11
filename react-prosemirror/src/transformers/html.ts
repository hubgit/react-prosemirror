import { DOMParser, DOMSerializer, Node, Schema } from 'prosemirror-model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Transformer<S extends Schema, T = any> {
  import: (input: T) => Node<S>
  export: (output: Node<S>) => T
}

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
