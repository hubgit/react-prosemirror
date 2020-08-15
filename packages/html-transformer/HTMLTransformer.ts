import { Transformer } from '@pompom/core'
import { DOMParser, DOMSerializer, Node, Schema } from 'prosemirror-model'

export class HTMLTransformer<S extends Schema>
  implements Transformer<string, S> {
  private parser: DOMParser
  private serializer: DOMSerializer
  private timer?: number

  public constructor(schema: S, private debounce = 0) {
    this.parser = DOMParser.fromSchema(schema)
    this.serializer = DOMSerializer.fromSchema(schema)
    // this.serializer = new XMLSerializer()
  }

  public import(input?: string): Node<S> {
    const template = document.createElement('template')

    if (input !== undefined) {
      template.innerHTML = input
    }

    return this.parser.parse(template.content)
  }

  public export(output: Node<S>, callback: (value: string) => void) {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }

    this.timer = window.setTimeout(() => {
      const fragment = this.serializer.serializeFragment(output.content)

      // return xmlSerializer.serializeToString(fragment)

      const container = document.createElement('div')
      container.appendChild(fragment)

      callback(container.innerHTML)
    }, this.debounce)
  }
}
