import { Transformer } from '@pompom/core'
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
  MarkdownParser,
  MarkdownSerializer,
} from 'prosemirror-markdown'
import { Node, Schema } from 'prosemirror-model'

export class MarkdownTransformer<S extends Schema>
  implements Transformer<string, S> {
  private parser: MarkdownParser
  private serializer: MarkdownSerializer
  private timer?: number

  public constructor(private debounce = 0) {
    this.parser = defaultMarkdownParser
    this.serializer = defaultMarkdownSerializer
  }

  public import(input?: string): Node<S> {
    return this.parser.parse(input || '')
  }

  public export(output: Node<S>, callback: (value: string) => void): void {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }

    this.timer = window.setTimeout(() => {
      callback(this.serializer.serialize(output))
    }, this.debounce)
  }
}
