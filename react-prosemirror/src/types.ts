import { Node, Schema } from 'prosemirror-model'
import { Transaction } from 'prosemirror-state'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Transformer<S extends Schema, T = any> {
  import: (input: T) => Node<S>
  export: (output: Node<S>) => T
}

export type DispatchTransaction = (transaction: Transaction) => void
