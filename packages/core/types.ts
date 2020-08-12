import { Command } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import {
  DOMOutputSpec,
  MarkSpec,
  Node,
  NodeSpec,
  Schema,
} from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView, NodeView } from 'prosemirror-view'

import { PomPom } from './PomPom'

export abstract class Transformer<
  T,
  N extends string = any,
  M extends string = any
> {
  public abstract import: (input?: T) => Node<Schema<N, M>>
  public abstract export: (output: Node<Schema<N, M>>) => T
}

export interface Action<S extends Schema> {
  // id: string
  label: string
  title: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
  run: Command<S>
  key?: string
}

export type NodeViewCreator<S extends Schema> = (
  node: Node<S>,
  view: EditorView<S>,
  getPos: () => number // | boolean
) => NodeView

export interface Extension<N extends string = any, M extends string = any> {
  actions?: (editor: PomPom<N, M>) => Record<string, Action<Schema<N, M>>>
  inputRules?: (editor: PomPom<N, M>) => Record<string, InputRule<Schema<N, M>>>
  marks?: Record<
    M,
    MarkSpec & {
      toXML?: (node: Node) => DOMOutputSpec
    }
  >
  nodes?: Record<
    N,
    NodeSpec & {
      toXML?: (node: Node) => DOMOutputSpec
    }
  >
  nodeViews?: Record<N | M, NodeViewCreator<Schema<N, M>>>
  plugins?: (editor: PomPom<N, M>) => Record<string, Plugin<any, Schema<N, M>>>
  styles?: string[]
}
