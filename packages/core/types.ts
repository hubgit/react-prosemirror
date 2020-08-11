import { Action } from '@pompom/commands'
import { MarkSpec, Node, NodeSpec, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { EditorProps } from 'prosemirror-view'

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

export abstract class Extension {
  public marks(): Record<string, MarkSpec> {
    return {}
  }

  public nodes(): Record<string, NodeSpec> {
    return {}
  }

  public actions<S extends Schema>(schema: S): Record<string, Action<S>> {
    return {}
  }

  public plugins<S extends Schema>(
    schema: S,
    actions: Record<string, Action<S>>
  ): Plugin<S>[] {
    return []
  }
}
