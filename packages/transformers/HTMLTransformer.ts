import { Transformer } from '@pompom/core'
import { DOMParser, DOMSerializer, Node, Schema } from 'prosemirror-model'

export class HTMLTransformer<N extends string = any, M extends string = any>
  implements Transformer<string, Schema<N, M>> {
  private parser: DOMParser
  private serializer: DOMSerializer

  public constructor(schema: Schema<N, M>) {
    this.parser = DOMParser.fromSchema(schema)
    this.serializer = DOMSerializer.fromSchema(schema)
    // this.serializer = new XMLSerializer()
  }

  public import(input?: string): Node<Schema<N, M>> {
    const template = document.createElement('template')

    if (input !== undefined) {
      template.innerHTML = input
    }

    return this.parser.parse(template.content)
  }

  // TODO: debounce?
  public export(output: Node<Schema<N, M>>): string {
    const fragment = this.serializer.serializeFragment(output.content)

    // return xmlSerializer.serializeToString(fragment)

    const container = document.createElement('div')
    container.appendChild(fragment)

    return container.innerHTML
  }
}
