import { Transformer } from '@pompom/core'
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
  MarkdownParser,
  MarkdownSerializer,
} from 'prosemirror-markdown'
import { Node, Schema } from 'prosemirror-model'

export class MarkdownTransformer<N extends string = any, M extends string = any>
  implements Transformer<string, Schema<N, M>> {
  private parser: MarkdownParser
  private serializer: MarkdownSerializer

  public constructor() {
    this.parser = defaultMarkdownParser
    this.serializer = defaultMarkdownSerializer
  }

  public import(input?: string): Node<Schema<N, M>> {
    return this.parser.parse(input || '')
  }

  // TODO: debounce?
  public export(output: Node<Schema<N, M>>): string {
    return this.serializer.serialize(output)
  }
}
