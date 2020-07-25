import { Node, Schema } from 'prosemirror-model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Transformer<S extends Schema, T extends any> {
  public abstract import: (input: T) => Node<S>
  public abstract export: (output: Node<S>) => T
}
