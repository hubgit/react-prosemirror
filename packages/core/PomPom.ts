import { baseKeymap, Command } from 'prosemirror-commands'
import { InputRule, inputRules } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { MarkSpec, Node, NodeSpec, Schema } from 'prosemirror-model'
import { EditorState, Plugin, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { Action, Extension, NodeViewCreator } from './types'

type HandleStateChange<S extends Schema> = (
  state: EditorState<S>,
  transactions?: Transaction<S>[]
) => void

export class PomPom<N extends string = any, M extends string = any> {
  public schema: Schema<N, M>
  public actions: Record<string, Action<Schema<N, M>>>
  public inputRules: Record<string, InputRule>
  public keys: Record<string, Command<Schema<N, M>>>
  public marks: Record<M, MarkSpec>
  public nodes: Record<N, NodeSpec>
  public nodeViews: Record<N | M, NodeViewCreator<Schema<N, M>>>
  public plugins: Record<string, Plugin>
  public handleStateChange: HandleStateChange<Schema<N, M>>
  public view: EditorView<Schema<N, M>>

  constructor(
    extensions: Extension<N, M>[] = [],
    handleStateChange: HandleStateChange<Schema<N, M>>
  ) {
    this.actions = {}
    this.inputRules = {}
    this.keys = {}
    this.marks = {} as Record<M, MarkSpec>
    this.nodes = {} as Record<N, NodeSpec>
    this.nodeViews = {} as Record<N | M, NodeViewCreator<Schema<N, M>>>
    this.plugins = {}

    for (const extension of extensions) {
      if (extension.marks) {
        for (const [key, mark] of Object.entries<MarkSpec>(extension.marks)) {
          this.marks[key as M] = mark
        }
      }

      if (extension.nodes) {
        for (const [key, node] of Object.entries<NodeSpec>(extension.nodes)) {
          this.nodes[key as N] = node
        }
      }
    }

    this.schema = new Schema<N, M>({
      marks: this.marks,
      nodes: this.nodes,
    })

    for (const extension of extensions) {
      if (extension.actions) {
        for (const [key, action] of Object.entries(extension.actions(this))) {
          this.actions[key] = action

          if (action.key && action.run) {
            // TODO: merge duplicate keys
            this.keys[action.key] = action.run
          }
        }
      }

      if (extension.plugins) {
        for (const [key, plugin] of Object.entries(extension.plugins(this))) {
          this.plugins[key] = plugin
        }
      }

      if (extension.styles) {
        Promise.all(extension.styles.map((style) => import(style)))
        // for (const style of extension.styles) {
        //   import(style)
        // }
      }

      if (extension.inputRules) {
        for (const [key, inputRule] of Object.entries(
          extension.inputRules(this)
        )) {
          this.inputRules[key] = inputRule
        }
      }

      if (extension.nodeViews) {
        for (const [key, nodeView] of Object.entries(extension.nodeViews)) {
          this.nodeViews[key] = nodeView
        }
      }
    }

    this.plugins.keymap = keymap(this.keys)
    this.plugins.baseKeymap = keymap(baseKeymap)
    this.plugins.inputRules = inputRules({
      rules: Object.values(this.inputRules),
    })

    this.handleStateChange = handleStateChange

    const view = new EditorView(undefined, {
      state: EditorState.create({
        schema: this.schema,
        plugins: Object.values(this.plugins),
      }),
      dispatchTransaction: (tr) => {
        const { state, transactions } = view.state.applyTransaction(tr)

        view.updateState(state)

        handleStateChange(state, transactions)
      },
    })

    this.view = view
  }

  public updateState(doc: Node<Schema<N, M>>): void {
    const state = EditorState.create({
      doc,
      plugins: this.view.state.plugins,
      // TODO: selection?
    })

    this.view.updateState(state)

    this.handleStateChange(state)
  }
}
