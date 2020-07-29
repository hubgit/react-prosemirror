import { Node, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { Decoration, EditorProps, EditorView, NodeView } from 'prosemirror-view'

export type NodeViewCreator = <S extends Schema>(
  node: Node<S>,
  view: EditorView<S>,
  getPos: boolean | (() => number),
  decorations: Decoration[]
) => NodeView<S>

export interface EditorConfig<S extends Schema, T> {
  editorProps: EditorProps<unknown, S>
  plugins: Plugin<S>[]
  schema: S
  transformer: Transformer<S, T>
}

export type EditorConfigCreator<P, S extends Schema, T> = (
  props: P
) => EditorConfig<S, T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Transformer<S extends Schema, T extends any> {
  public abstract import: (input?: T) => Node<S>
  public abstract export: (output: Node<S>) => T
}
