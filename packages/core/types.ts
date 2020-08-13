import { Command } from 'prosemirror-commands'
import { InputRule } from 'prosemirror-inputrules'
import {
  DOMOutputSpec,
  MarkSpec,
  Node,
  NodeSpec,
  ParseRule,
  Schema,
} from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView, NodeView } from 'prosemirror-view'

export abstract class Transformer<T, S extends Schema> {
  public abstract import: (input?: T) => Node<S>
  public abstract export: (output: Node<S>) => T
}

export interface Action<N extends string = any, M extends string = any> {
  // id: string
  label: string
  title: string
  active?: (state: EditorState<Schema<N, M>>) => boolean
  enable?: (state: EditorState<Schema<N, M>>) => boolean
  run: Command<Schema<N, M>>
  key?: string
}

export type NodeViewCreator<S extends Schema> = (
  node: Node<S>,
  view: EditorView<S>,
  getPos: () => number // | boolean
) => NodeView

interface ParseRules extends Omit<ParseRule, 'getAttrs'> {
  getAttrs?:
    | ((element: Element) => { [key: string]: any } | false | null | undefined)
    | ((style: string) => { [key: string]: any } | false | null | undefined)
    | null
}

interface PomPomMarkSpec extends Omit<MarkSpec, 'parseDOM'> {
  parseDOM?: Array<ParseRules>
  toXML?: (node: Node) => DOMOutputSpec
}

interface PomPomNodeSpec extends Omit<NodeSpec, 'parseDOM'> {
  parseDOM?: Array<ParseRules>
  toXML?: (node: Node) => DOMOutputSpec
}

export interface Extension<N extends string = any, M extends string = any> {
  actions?: (schema: Schema<N, M>) => Record<string, Action<N, M>>
  inputRules?: (schema: Schema<N, M>) => Record<string, InputRule<Schema<N, M>>>
  marks?: Record<M, PomPomMarkSpec>
  nodes?: Record<N, PomPomNodeSpec>
  nodeViews?: Record<N | M, NodeViewCreator<Schema<N, M>>>
  plugins?: (schema: Schema<N, M>) => Record<string, Plugin<any, Schema<N, M>>>
  styles?: string[]
}
